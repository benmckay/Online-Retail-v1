const orderModel = require("../models/orderModel");

// Get all orders
const getorders = async (req, res) => {
  try {
    const orders = await orderModel.getorders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single order
const getorderById = async (req, res) => {
  try {
    const order = await orderModel.getorderById(req.params.id);
    if (!order) return res.status(404).json({ message: "order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new order
const createorder = async (req, res) => {
  try {
    const { name, email } = req.body;
    const neworder = await orderModel.createorder(name, email);
    res.status(201).json(neworder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order
const updateorder = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedorder = await orderModel.updateorder(req.params.id, name, email);
    res.json(updatedorder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete order
const deleteorder = async (req, res) => {
  try {
    await orderModel.deleteorder(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getorders, getorderById, createorder, updateorder, deleteorder };
