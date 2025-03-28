const customerModel = require("../models/customerModel");

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerModel.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: "First name, last name, and email are required" });
    }

    const newCustomer = await customerModel.createCustomer(first_name, last_name, email);
    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: "First name, last name, and email are required" });
    }

    const updatedCustomer = await customerModel.updateCustomer(req.params.id, first_name, last_name, email);
    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await customerModel.deleteCustomer(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.json({
      message: "Customer deleted successfully",
      customer: deletedCustomer,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
