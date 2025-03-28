<<<<<<< HEAD
const pool = require("../db");

// Get all customers
const getCustomers = async () => {
  try {
    const client = await pool.connect()
     
    const data = await client.query(`SELECT * FROM customers`);


    return data.rows;

    // const result = await pool.query("SELECT * FROM customers");
    // console.log("===== request ");
    // return result.rows;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
// const getCustomers = async () => {
//   try {
//     const result = await pool.query("SELECT * FROM customers");
//     console.log("===== request ");
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching customers:", error);
//     throw error;
//   }
// };

// Get a single customer
const getCustomerById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    throw error;
  }
};

// Create a new customer
const createCustomer = async (first_name, last_name, email) => {
  const query = `
    INSERT INTO customers (first_name, last_name, email)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [first_name, last_name, email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update customer
const updateCustomer = async (id, first_name, last_name, email) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      "UPDATE customers SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *",
      [id, first_name, last_name, email]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    throw error;
  }
};

// Delete customer
const deleteCustomer = async (id) => {
  try {
    await pool.query("DELETE FROM customers WHERE id = $1", [id]);
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    throw error;
  }
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
=======
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
>>>>>>> c8a65bcf6f2e8f8b03cb4bf3a0116e806549f3c6
