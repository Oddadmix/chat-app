const UserService = require('../services/user');

const login = (socket) => async (data) => {
  //
  await UserService.login(data);
  socket.emit('otpSent');
};

const verifyOtp = (socket) => async (data) => {
  const result = await UserService.verifyOtp(data);
  console.log(result);
  if (!result) socket.emit('otpFailed');
  else
    socket.emit('otpSuccess', {
      token: result,
    });
};

module.exports = {
  login,
  verifyOtp,
};
