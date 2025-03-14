const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME
};

// Enhanced validation middleware
const validateRegisterInput = (req, res, next) => {
  const { fullName, email, password, address, city, country, state, zipcode } = req.body;
  
  if (!fullName || !email || !password || !address || !city || !country || !state || !zipcode) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  
  next();
};

// Registration Route
router.post('/register', validateRegisterInput, async (req, res) => {
  let connection;
  try {
    console.log('Received data:', req.body);
    const { fullName, email, password, address, city, country, state, zipcode, billingSame } = req.body;

    connection = await mysql.createConnection(dbConfig);

    const [existingUser] = await connection.execute(
      'SELECT email FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await connection.execute(
      'INSERT INTO users (fullName, email, password, address, city, country, state, zipcode, billingSame) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fullName, email, hashedPassword, address, city, country, state, zipcode, billingSame ? 1 : 0]
    );

    res.status(201).json({ 
      message: 'Registration successful',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Registration error:', error.message, error.stack);
    res.status(500).json({ message: `Server error: ${error.message}` });
  } finally {
    if (connection) await connection.end();
  }
});

// Login validation middleware
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  next();
};

// Login Route
router.post('/login', validateLoginInput, async (req, res) => {
  let connection;
  try {
    console.log('Login attempt with data:', req.body);
    const { email, password } = req.body;

    connection = await mysql.createConnection(dbConfig);

    const [user] = await connection.execute(
      'SELECT id, fullName, email, password FROM users WHERE email = ?',
      [email]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user[0].id,
        fullName: user[0].fullName,
        email: user[0].email
      }
    });
  } catch (error) {
    console.error('Login error:', error.message, error.stack);
    res.status(500).json({ message: `Server error: ${error.message}` });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;