<<<<<<< HEAD
const db = require('../db');

class CustomerController {
  // Get all customers with pagination
  async getCustomers(page = 1, limit = 100) {
    try {
      const offset = (page - 1) * limit;
      
      // Count total customers
      const countQuery = 'SELECT COUNT(*) FROM customers';
      const countResult = await db.query(countQuery);
      const totalCustomers = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(totalCustomers / limit);

      // Fetch customers with pagination
      const query = `
        SELECT customer_id, first_name, last_name, email, created_at 
        FROM customers 
        ORDER BY customer_id 
        LIMIT $1 OFFSET $2
      `;
      const result = await db.query(query, [limit, offset]);

      return {
        customers: result.rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalCustomers,
          pageSize: limit
        }
      };
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  // Create a new customer or update if exists
  async createCustomer(req, res, next) {
    try {
      const { first_name, last_name, email } = req.body;

      // Validate input
      if (!first_name || !last_name || !email) {
        return res.status(400).json({
          error: 'First name, last name, and email are required'
        });
      }

      // Check if customer already exists
      const existingCustomerQuery = 'SELECT * FROM customers WHERE email = $1';
      const existingCustomerResult = await db.query(existingCustomerQuery, [email]);

      if (existingCustomerResult.rows.length > 0) {
        // Customer exists, return existing customer
        return res.status(200).json({
          message: 'Customer already exists',
          customer: existingCustomerResult.rows[0]
        });
      }

      // Insert new customer
      const insertQuery = `
        INSERT INTO customers (first_name, last_name, email, created_at) 
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP) 
        RETURNING *`;
      const values = [first_name, last_name, email];

      const result = await db.query(insertQuery, values);
      
      res.status(201).json({
        message: 'Customer created successfully',
        customer: result.rows[0]
      });
    } catch (error) {
      console.error('Error creating customer:', error);
      next(error);
    }
  }

  // Update existing customer
  async updateCustomer(req, res, next) {
    try {
      const { id } = req.params;
      const { first_name, last_name, email } = req.body;

      // Validate input
      if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }

      // Check if customer exists
      const checkQuery = 'SELECT * FROM customers WHERE customer_id = $1';
      const checkResult = await db.query(checkQuery, [id]);

      if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Update customer
      const updateQuery = `
        UPDATE customers 
        SET 
          first_name = COALESCE($1, first_name), 
          last_name = COALESCE($2, last_name), 
          email = COALESCE($3, email)
        WHERE customer_id = $4 
        RETURNING *
      `;
      const values = [first_name, last_name, email, id];

      const result = await db.query(updateQuery, values);

      res.status(200).json({
        message: 'Customer updated successfully',
        customer: result.rows[0]
      });
    } catch (error) {
      console.error('Error updating customer:', error);
      next(error);
    }
  }

  // Delete customer
  async deleteCustomer(req, res, next) {
    try {
      const { id } = req.params;

      // Validate input
      if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }

      // Check if customer exists
      const checkQuery = 'SELECT * FROM customers WHERE customer_id = $1';
      const checkResult = await db.query(checkQuery, [id]);

      if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Delete customer
      const deleteQuery = 'DELETE FROM customers WHERE customer_id = $1 RETURNING *';
      const result = await db.query(deleteQuery, [id]);

      res.status(200).json({
        message: 'Customer deleted successfully',
        customer: result.rows[0]
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      next(error);
    }
  }

  // Get customer by ID
  async getCustomerById(req, res, next) {
    try {
      const { id } = req.params;

      // Validate input
      if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
      }

      const query = `
        SELECT customer_id, first_name, last_name, email, created_at 
        FROM customers 
        WHERE customer_id = $1
      `;
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching customer:', error);
      next(error);
    }
  }
}

module.exports = new CustomerController();
=======
const customerModel = require("../models/customerModel");

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single customer
const getCustomerById = async (req, res) => {
  try {
    const customer = await customerModel.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newCustomer = await customerModel.createCustomer(name, email);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedCustomer = await customerModel.updateCustomer(req.params.id, name, email);
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    await customerModel.deleteCustomer(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
>>>>>>> c8a65bcf6f2e8f8b03cb4bf3a0116e806549f3c6
