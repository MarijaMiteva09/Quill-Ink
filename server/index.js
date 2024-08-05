const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const db = mysql.createConnection({
    host: '128.140.70.191',
    user: 'marija',
    password: 'password',
    port: 3306,
    database: '' // Replace with your actual database name
});

db.connect(err => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log('Connected to the database');
});

app.listen(port, err => {
    if (err) {
        console.error("Error starting the server:", err);
        return;
    }
    console.log(`Server running on http://localhost:${port}`);
});
