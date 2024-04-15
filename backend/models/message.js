const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Message = sequelize.define('Message', {
  text: DataTypes.STRING,
  sender: DataTypes.STRING,
  chatId: DataTypes.STRING,
});

module.exports = Message;
