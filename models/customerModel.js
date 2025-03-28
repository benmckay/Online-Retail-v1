const pool = require("../db");

// Get all customers
const getCustomers = async () => {
  const result = await pool.query("SELECT * FROM customers");
  return result.rows;
};

// Get a single customer by ID
const getCustomerById = async (id) => {
  const result = await pool.query("SELECT * FROM customers WHERE customer_id = $1", [id]);
  return result.rows[0];
};

// Create a new customer
const createCustomer = async (first_name, last_name, email) => {
  const result = await pool.query(
    "INSERT INTO customers (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *",
    [first_name, last_name, email]
  );
  return result.rows[0];
};

// Update a customer
const updateCustomer = async (id, first_name, last_name, email) => {
  const result = await pool.query(
    "UPDATE customers SET first_name = $1, last_name = $2, email = $3 WHERE customer_id = $4 RETURNING *",
    [first_name, last_name, email, id]
  );
  return result.rows[0];
};

// Delete a customer
const deleteCustomer = async (id) => {
  const result = await pool.query("DELETE FROM customers WHERE customer_id = $1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
