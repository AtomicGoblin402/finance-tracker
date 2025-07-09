const { Sequelize, DataTypes } = require('sequelize');

// Update these values as needed for your local PostgreSQL setup
const sequelize = new Sequelize('finance_tracker', 'postgres', 'Hbomb1523', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = { sequelize, User };
