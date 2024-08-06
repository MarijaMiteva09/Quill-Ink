const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Hardcoded JWT secret (not recommended for production)
const jwtSecret = 'your_jwt_secret'; // Replace with your actual secret

app.use(cors({
    origin: 'http://localhost:3000', // Update this to your front-end URL
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json()); // Middleware to parse JSON requests

const db = mysql.createConnection({
    host: '128.140.70.191',
    user: 'marija',
    password: 'password',
    port: 3306,
    database: 'register' // Replace with your actual database name
});

db.connect(err => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log('Connected to the database');
});

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Registration Endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
      
        // Insert user into database
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user in database
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

        res.json({ token });
    });
});

// User Profile Endpoint
app.get('/profile', authenticateToken, (req, res) => {
    const userId = req.user.id;

    db.query('SELECT id, email FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        res.json(results[0]);
    });
});

// Add Book to Cart
app.post('/cart', authenticateToken, (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id;

    db.query('INSERT INTO cart_items (user_id, book_id) VALUES (?, ?)', [userId, bookId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Book added to cart' });
    });
});

// Get Cart Items
app.get('/cart', authenticateToken, (req, res) => {
    const userId = req.user.id;

    db.query('SELECT book_id FROM cart_items WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Remove Book from Cart
app.delete('/cart/:bookId', authenticateToken, (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.id;

    db.query('DELETE FROM cart_items WHERE user_id = ? AND book_id = ?', [userId, bookId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Book removed from cart' });
    });
});

app.listen(port, err => {
    if (err) {
        console.error("Error starting the server:", err);
        return;
    }
    console.log(`Server running on http://localhost:${port}`);
});
