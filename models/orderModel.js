<<<<<<< HEAD
const pool = require("../db");

// Get all orders
const getOrders = async () => {
  const result = await pool.query("SELECT * FROM orders");
  return result.rows;
};

// Get a single order
const getOrderById = async (id) => {
  const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new order
const createOrder = async (customer_id, order_date, total_amount) => {
  const result = await pool.query(
    "INSERT INTO orders (customer_id, order_date, total_amount) VALUES ($1, $2, $3) RETURNING *",
    [customer_id, order_date, total_amount]
  );
  return result.rows[0];
};

// Update order
const updateOrder = async (id, customer_id, order_date, total_amount) => {
  const result = await pool.query(
    "UPDATE orders SET customer_id = $1, order_date = $2, total_amount = $3 WHERE id = $4 RETURNING *",
    [customer_id, order_date, total_amount, id]
  );
  return result.rows[0];
};

// Delete order
const deleteOrder = async (id) => {
  await pool.query("DELETE FROM orders WHERE id = $1", [id]);
};

module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };
=======
const pool = require("../db");

// Get all orders
const getorders = async () => {
  const result = await pool.query("SELECT * FROM orders");
  return result.rows;
};

// Get a single order
const getorderById = async (id) => {
  const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new order
const createorder = async (name, email) => {
  const result = await pool.query(
    "INSERT INTO orders (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

// Update order
const updateorder = async (id, name, email) => {
  const result = await pool.query(
    "UPDATE orders SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};

// Delete order
const deleteorder = async (id) => {
  await pool.query("DELETE FROM orders WHERE id = $1", [id]);
};

module.exports = { getorders, getorderById, createorder, updateorder, deleteorder };
// Compare this snippet from Online-Retail-v1/routes/orderRoutes.js:
// const express = require("express");
>>>>>>> c8a65bcf6f2e8f8b03cb4bf3a0116e806549f3c6
