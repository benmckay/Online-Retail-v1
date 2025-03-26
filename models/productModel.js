const pool = require("../db");

// Get all products
const getProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

// Get a single product
const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new product
const createProduct = async (name, email) => {
  const result = await pool.query(
    "INSERT INTO products (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

// Update product
const updateProduct = async (id, name, email) => {
  const result = await pool.query(
    "UPDATE products SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};

// Delete product
const deleteProduct = async (id) => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
};

// Export the functions correctly
module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
