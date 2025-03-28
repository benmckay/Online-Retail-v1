const retailSaleModel = require("../models/retailSaleModel");

// Get all retail sales
exports.getAllRetailSales = async (req, res) => {
  try {
    const sales = await retailSaleModel.getRetailSales();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single retail sale by invoice_no
exports.getRetailSaleByInvoiceNo = async (req, res) => {
  try {
    const sale = await retailSaleModel.getRetailSaleByInvoiceNo(req.params.invoice_no);
    if (!sale) return res.status(404).json({ message: "Retail sale not found" });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new retail sale
exports.createRetailSale = async (req, res) => {
  try {
    const newSale = await retailSaleModel.createRetailSale(req.body);
    res.status(201).json({ message: "Retail sale created successfully", sale: newSale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a retail sale
exports.updateRetailSale = async (req, res) => {
  try {
    const updatedSale = await retailSaleModel.updateRetailSale(req.params.invoice_no, req.body);
    if (!updatedSale) return res.status(404).json({ message: "Retail sale not found" });
    res.json({ message: "Retail sale updated successfully", sale: updatedSale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a retail sale
exports.deleteRetailSale = async (req, res) => {
  try {
    const deletedSale = await retailSaleModel.deleteRetailSale(req.params.invoice_no);
    if (!deletedSale) return res.status(404).json({ message: "Retail sale not found" });
    res.json({ message: "Retail sale deleted successfully", sale: deletedSale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
