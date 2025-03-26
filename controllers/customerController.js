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
