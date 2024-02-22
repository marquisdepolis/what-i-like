const Sequelize = require('sequelize');
const db = require('../db/connection'); // Assuming there's a connection file in the db directory
const User = require('./user');
const Category = require('./category');

const Product = db.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  link: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  like_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  want_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false // because we are providing created_at and updated_at manually
});

// Associations
Product.belongsTo(User, { foreignKey: 'user_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Sync model with database
Product.sync();

module.exports = Product;
