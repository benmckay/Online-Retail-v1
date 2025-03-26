const pool = require("../db");

// Get all customers
const getCustomers = async () => {
  const result = await pool.query("SELECT * FROM customers");
  return result.rows;
};

// Get a single customer
const getCustomerById = async (id) => {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new customer
const createCustomer = async (name, email) => {
  const result = await pool.query(
    "INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

// Update customer
const updateCustomer = async (id, name, email) => {
  const result = await pool.query(
    "UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};

// Delete customer
const deleteCustomer = async (id) => {
  await pool.query("DELETE FROM customers WHERE id = $1", [id]);
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
