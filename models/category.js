const Sequelize = require('sequelize');
const db = require('../db/connection'); // Assuming there's a connection file in the db directory

const Category = db.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false // because we are not using createdAt and updatedAt
});

// Sync model with database
Category.sync();

module.exports = Category;
