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