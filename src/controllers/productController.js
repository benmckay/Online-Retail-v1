// productController.js
const db = require('../models/db');

// Retrieve all products
exports.getAllProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve a product by its ID
exports.getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, inventory } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO products (name, description, price, inventory) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, inventory]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, description, price, inventory } = req.body;
  try {
    const result = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3, inventory = $4 WHERE id = $5 RETURNING *',
      [name, description, price, inventory, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
