const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    return res.status(201).json({ success: true, message: 'User registered successfully' });
  });
});


app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
});


let cart = []; 

app.post('/api/cart', (req, res) => {
  const { userId, bookId, quantity } = req.body;

  if (!userId || !bookId || quantity === undefined) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  let userCart = cart.find((c) => c.userId === userId);
  if (!userCart) {
    userCart = { userId, items: [] };
    cart.push(userCart);
  }

  const existingItem = userCart.items.find((item) => item.bookId === bookId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    userCart.items.push({ bookId, quantity });
  }

  return res.status(200).json({ success: true, cart: userCart.items });
});

app.get('/api/cart', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  const userCart = cart.find((c) => c.userId === userId);
  return res.status(200).json({ success: true, cart: userCart ? userCart.items : [] });
});

app.delete('/api/cart', (req, res) => {
  const { userId, bookId } = req.query;

  if (!userId || !bookId) {
    return res.status(400).json({ success: false, message: 'User ID and Book ID are required' });
  }

  const userCart = cart.find((c) => c.userId === userId);
  if (userCart) {
    userCart.items = userCart.items.filter((item) => item.bookId !== bookId);
  }

  return res.status(200).json({ success: true, cart: userCart ? userCart.items : [] });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
