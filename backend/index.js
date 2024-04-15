require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const dbConnect = require('./db');
const Chat = require('./models/chat');
const Message = require('./models/message');

const UserService = require('./services/user');
const { login, verifyOtp } = require('./sockets/auth');
const { updateChatPrivacy } = require('./sockets/chat');
const { inviteUser } = require('./sockets/user');

dbConnect();

const buildPath = path.normalize(path.join(__dirname, '../ui/dist'));
app.use(express.static(buildPath));

const chats = {};

io.on('connection', (socket) => {
  const chatId = socket.request._query.chatId;
  const isLoggedIn = socket.request._query.isLoggedIn;

  socket.on('login', login(socket));

  socket.on('otpVerification', verifyOtp(socket));

  if (!chats[chatId]) {
    //chats[undefined] = []
    chats[chatId] = [];
  }
  chats[chatId].push(socket);

  socket.on('makePrivate', updateChatPrivacy);

  socket.on('inviteUsers', inviteUser);

  //Handle disconnect
  socket.on('getMessages', async (data) => {
    const token = data.token;
    const decodedToken = UserService.validateToken(token);
    if (!decodedToken) {
      return;
    }
    const messages = await Message.findAll({
      where: {
        chatId: data.chatId,
      },
    });
    socket.emit('getMessages', messages);
  });

  socket.on('getChats', async (data) => {
    const token = data.token;
    const decodedToken = UserService.validateToken(token);
    if (!decodedToken) {
      return;
    }
    const chats = await Chat.findAll({
      where: {
        ownerId: decodedToken.userId,
      },
    });
    socket.emit('getChats', chats);
  });

  socket.on('message', async (data) => {
    const message = data.message;
    const token = data.token;
    const decodedToken = UserService.validateToken(token);
    if (!decodedToken) {
      return;
    }
    const currentChatId = message.chatId;
    await Chat.findOrCreate({
      where: {
        name: currentChatId,
      },
      defaults: {
        ownerId: decodedToken.userId,
      },
    });
    await Message.create({
      chatId: currentChatId,
      text: message.text,
      sender: decodedToken.userId,
    });
    if (!chats[currentChatId]) return;
    chats[chatId].forEach((s) => {
      if (s === socket) return;
      s.emit('message', message);
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
