const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mysql = require('mysql');
const dotenv = require('dotenv');
const auth = require('./config/auth');
const apiRoutes = require('./routes/api');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Apply middleware
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to database');
});

// Auth setup
auth.configure(app, db);

// API routes
app.use('/api', apiRoutes);

// Serve user pages
app.get('/user/:id', (req, res) => {
  res.sendFile(__dirname + '/views/userPage.html');
});

// Serve feed page
app.get('/feed', (req, res) => {
  res.sendFile(__dirname + '/views/feedPage.html');
});

// Catch-all for any other GET requests (SPA)
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
