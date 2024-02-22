const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware to handle database connection errors
const dbMiddleware = (req, res, next) => {
  if (db.state === 'disconnected') {
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to the database: ', err);
        return res.status(500).send('Error connecting to the database');
      }
      next();
    });
  } else {
    next();
  }
};

router.use(dbMiddleware);

// Get all products
router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving products');
    }
    res.json(results);
  });
});

// Get products by category
router.get('/products/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  db.query('SELECT * FROM products WHERE category_id = ?', [categoryId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving products by category');
    }
    res.json(results);
  });
});

// Add a new product
router.post('/products', (req, res) => {
  const { user_id, category_id, title, description, link } = req.body;
  db.query('INSERT INTO products (user_id, category_id, title, description, link) VALUES (?, ?, ?, ?, ?)', [user_id, category_id, title, description, link], (err, results) => {
    if (err) {
      return res.status(500).send('Error adding product');
    }
    res.status(201).send('Product added');
  });
});

// Like a product
router.post('/products/:productId/like', (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  db.query('INSERT INTO likes (user_id, product_id) VALUES (?, ?)', [userId, productId], (err, results) => {
    if (err) {
      return res.status(500).send('Error liking product');
    }
    res.status(201).send('Product liked');
  });
});

// Want a product
router.post('/products/:productId/want', (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  db.query('INSERT INTO wants (user_id, product_id) VALUES (?, ?)', [userId, productId], (err, results) => {
    if (err) {
      return res.status(500).send('Error wanting product');
    }
    res.status(201).send('Product wanted');
  });
});

// Get user's page with their liked and wanted products
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving user products');
    }
    res.json(results);
  });
});

module.exports = router;
