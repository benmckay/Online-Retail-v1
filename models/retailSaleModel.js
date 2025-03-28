const pool = require("../db");

// Get all retail sales
const getRetailSales = async () => {
  try {
    const result = await pool.query("SELECT * FROM retailsale");
    return result.rows;
  } catch (err) {
    throw new Error("Failed to fetch retail sales: " + err.message);
  }
};

// Get a single retail sale by invoice_no
const getRetailSaleByInvoiceNo = async (invoice_no) => {
  try {
    const result = await pool.query("SELECT * FROM retailsale WHERE invoice_no = $1", [invoice_no]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to fetch retail sale by invoice_no: " + err.message);
  }
};

// Create a new retail sale
const createRetailSale = async (data) => {
  const { invoice_no, stock_code, description, quantity, invoice_date, unit_price, customer_id, country } = data;
  try {
    const result = await pool.query(
      `INSERT INTO retailsale (invoice_no, stock_code, description, quantity, invoice_date, unit_price, customer_id, country)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [invoice_no, stock_code, description, quantity, invoice_date, unit_price, customer_id, country]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to create retail sale: " + err.message);
  }
};

// Update a retail sale
const updateRetailSale = async (invoice_no, data) => {
  const { stock_code, description, quantity, invoice_date, unit_price, customer_id, country } = data;
  try {
    const result = await pool.query(
      `UPDATE retailsale
       SET stock_code = $1, description = $2, quantity = $3, invoice_date = $4, unit_price = $5, customer_id = $6, country = $7
       WHERE invoice_no = $8 RETURNING *`,
      [stock_code, description, quantity, invoice_date, unit_price, customer_id, country, invoice_no]
    );

    if (result.rowCount === 0) {
      throw new Error(`No retail sale found with invoice_no: ${invoice_no}`);
    }

    return result.rows[0];
  } catch (err) {
    console.error("Failed to update retail sale:", err.message, { invoice_no, data });
    throw new Error("Failed to update retail sale: " + err.message);
  }
};

// Delete a retail sale
const deleteRetailSale = async (invoice_no) => {
  try {
    const result = await pool.query("DELETE FROM retailsale WHERE invoice_no = $1 RETURNING *", [invoice_no]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to delete retail sale: " + err.message);
  }
};

// Get retail sales with pagination
const getRetailSalesWithPagination = async (limit, offset) => {
  try {
    const result = await pool.query("SELECT * FROM retailsale LIMIT $1 OFFSET $2", [limit, offset]);
    return result.rows;
  } catch (err) {
    throw new Error("Failed to fetch retail sales with pagination: " + err.message);
  }
};

// Get total count of retail sales
const getRetailSalesCount = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS total FROM retailsale");
    return parseInt(result.rows[0].total, 10);
  } catch (err) {
    throw new Error("Failed to fetch retail sales count: " + err.message);
  }
};

module.exports = {
  getRetailSales,
  getRetailSaleByInvoiceNo,
  createRetailSale,
  updateRetailSale,
  deleteRetailSale,
  getRetailSalesWithPagination,
  getRetailSalesCount,
};
