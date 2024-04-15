const User = require('../models/user');
const { sendOtp, sendInvite } = require('./email');
const jwt = require('jsonwebtoken');

async function login(data) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  sendOtp(data.email, otp);

  let user = await User.findOne({ where: { email: data.email } });

  if (user) {
    user.otp = otp;
    await user.save();
  } else {
    user = await User.create({ email: data.email, otp });
  }
}

async function verifyOtp(data) {
  const otp = data.otp;
  const email = data.email;
  const user = await User.findOne({ where: { email, otp } });
  if (!user) false;
  else {
    const token = jwt.sign(
      { userId: user.dataValues.id },
      process.env.JWT_SECRET
    );
    return token;
  }
}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {});
    console.log(decoded);
    return decoded;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function inviteUser(data) {
  const chatId = data.chatId;
  const invitedUser = data.invitedUser;
  sendInvite(invitedUser, chatId);
}

module.exports = {
  login,
  verifyOtp,
  validateToken,
  inviteUser,
};
