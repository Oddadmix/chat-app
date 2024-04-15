const UserService = require('../services/user');

const inviteUser = async (data) => {
  const token = data.token;
  const decodedToken = UserService.validateToken(token);
  if (!decodedToken) {
    return;
  }
  await UserService.inviteUser(data);
};

module.exports = {
  inviteUser,
};
