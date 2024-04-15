const sequelize = require('./sequelize');
require('./models/user');
require('./models/chat');
require('./models/message');

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = dbConnect;
