const pool = require("../db");

// Get all products
const getProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

// Get a single product
const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);
  return result.rows[0];
};

// Create a new product
const createProduct = async (name, description, price) => {
  const result = await pool.query(
    "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
    [name, description || null, price] // Ensure description defaults to null if not provided
  );
  return result.rows[0];
};

// Update product
const updateProduct = async (id, name, description, price) => {
  const result = await pool.query(
    "UPDATE products SET name = $1, description = $2, price = $3 WHERE product_id = $4 RETURNING *", // Added description
    [name, description || null, price, id] // Ensure description defaults to null if not provided
  );
  return result.rows[0];
};

// Delete product
const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE product_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] || null; // Return null if no rows are returned
};

// Check if a product is referenced in order_details
const isProductReferenced = async (id) => {
  const result = await pool.query(
    "SELECT 1 FROM order_details WHERE product_id = $1 LIMIT 1",
    [id]
  );
  return result.rowCount > 0; // Return true if the product is referenced
};

// Export the functions correctly
module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, isProductReferenced };
