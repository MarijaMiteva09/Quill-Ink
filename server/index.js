const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
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

// Registration Endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insert user into database
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User registered successfully' });
    });
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
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    });
});

app.listen(port, err => {
    if (err) {
        console.error("Error starting the server:", err);
        return;
    }
    console.log(`Server running on http://localhost:${port}`);
});
