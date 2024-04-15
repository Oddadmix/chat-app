const Chat = require('../models/chat');
const UserService = require('../services/user');

const updateChatPrivacy = async (data) => {
  const token = data.token;
  const decodedToken = UserService.validateToken(token);
  if (!decodedToken) {
    return;
  }
  const chatId = data.chatId;
  await Chat.update(
    {
      privacy: 1, // make private
    },
    {
      where: {
        name: chatId,
        ownerId: decodedToken.userId,
      },
    }
  );
};

module.exports = {
  updateChatPrivacy,
};
