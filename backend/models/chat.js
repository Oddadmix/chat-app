const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Chat = sequelize.define('Chat', {
  name: DataTypes.STRING,
  ownerId: DataTypes.INTEGER, // user id
  privacy: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
  }, // 0: public, 1: private
});

module.exports = Chat;
