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
const createProduct = async ({ name, description, price, stock }) => {
  try {
    const query = `
      INSERT INTO products (name, description, price, stock, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const values = [name, description, price, stock];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (err) {
    console.error("Error in createProduct:", err.message);
    throw new Error("Failed to create product");
  }
};

// Update product
const updateProduct = async (id, { name, description, price, stock }) => {
  try {
    const query = `
      UPDATE products
      SET name = $1, description = $2, price = $3, stock = $4
      WHERE product_id = $5
      RETURNING *;
    `;
    const values = [name, description, price, stock, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error in updateProduct:", err.message);
    throw new Error("Failed to update product");
  }
};

// Delete product
const deleteProduct = async (id) => {
  try {
    const query = `
      DELETE FROM products
      WHERE product_id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Product not found");
    }
    return rows[0];
  } catch (err) {
    console.error("Error in deleteProduct:", err.message);
    throw new Error(err.message);
  }
};

// Check if a product is referenced in order_details
const isProductReferenced = async (productId) => {
  try {
    const query = `
      SELECT EXISTS (
        SELECT 1 FROM order_details WHERE product_id = $1
      ) AS is_referenced;
    `;
    const { rows } = await pool.query(query, [productId]);
    return rows[0].is_referenced;
  } catch (err) {
    console.error("Error in isProductReferenced:", err.message);
    throw new Error("Failed to check product references");
  }
};

// Export the functions correctly
module.exports = { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  isProductReferenced
};

