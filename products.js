const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all products
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add other endpoints (GET by ID, POST, PUT, DELETE) similarly...