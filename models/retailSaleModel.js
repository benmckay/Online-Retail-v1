const pool = require("../db");

// Get all retail sales
const getRetailSales = async () => {
  const result = await pool.query("SELECT * FROM retailsale");
  return result.rows;
};

// Get a single retail sale by invoice_no
const getRetailSaleByInvoiceNo = async (invoice_no) => {
  const result = await pool.query("SELECT * FROM retailsale WHERE invoice_no = $1", [invoice_no]);
  return result.rows[0];
};

// Create a new retail sale
const createRetailSale = async (data) => {
  const { invoice_no, stock_code, description, quantity, invoice_date, unit_price, customer_id, country } = data;
  const result = await pool.query(
    `INSERT INTO retailsale (invoice_no, stock_code, description, quantity, invoice_date, unit_price, customer_id, country)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [invoice_no, stock_code, description, quantity, invoice_date, unit_price, customer_id, country]
  );
  return result.rows[0];
};

// Update a retail sale
const updateRetailSale = async (invoice_no, data) => {
  const { stock_code, description, quantity, invoice_date, unit_price, customer_id, country } = data;
  const result = await pool.query(
    `UPDATE retailsale
     SET stock_code = $1, description = $2, quantity = $3, invoice_date = $4, unit_price = $5, customer_id = $6, country = $7
     WHERE invoice_no = $8 RETURNING *`,
    [stock_code, description, quantity, invoice_date, unit_price, customer_id, country, invoice_no]
  );
  return result.rows[0];
};

// Delete a retail sale
const deleteRetailSale = async (invoice_no) => {
  const result = await pool.query("DELETE FROM retailsale WHERE invoice_no = $1 RETURNING *", [invoice_no]);
  return result.rows[0];
};

module.exports = { getRetailSales, getRetailSaleByInvoiceNo, createRetailSale, updateRetailSale, deleteRetailSale };
