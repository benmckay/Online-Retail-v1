const retailSaleModel = require("../models/retailSaleModel");

// Get all retail sales
exports.getAllRetailSales = async (req, res) => {
  try {
    const retailSales = await retailSaleModel.getRetailSales();
    if (!retailSales || retailSales.length === 0) {
      return res.status(404).json({ success: false, message: "No retail sales found" });
    }
    res.status(200).json({ success: true, data: retailSales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a single retail sale by invoice_no
exports.getRetailSaleByInvoiceNo = async (req, res) => {
  const { invoice_no } = req.params;
  try {
    const retailSale = await retailSaleModel.getRetailSaleByInvoiceNo(invoice_no);
    if (!retailSale) {
      return res.status(404).json({ success: false, message: "Retail sale not found" });
    }
    res.status(200).json({ success: true, data: retailSale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Create a new retail sale
exports.createRetailSale = async (req, res) => {
  try {
    const { invoice_no, stock_code, description, quantity, invoice_date, unit_price, customer_id, country } = req.body;

    // Validate required fields
    if (!invoice_no || !stock_code || !description || !quantity || !invoice_date || !unit_price || !customer_id || !country) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newSale = await retailSaleModel.createRetailSale(req.body);
    res.status(201).json({ success: true, message: "Retail sale created successfully", data: newSale });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a retail sale
exports.updateRetailSale = async (req, res) => {
  try {
    const { stock_code, description, quantity, invoice_date, unit_price, customer_id, country } = req.body;

    // Validate required fields
    if (!stock_code || !description || !quantity || !invoice_date || !unit_price || !customer_id || !country) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const updatedSale = await retailSaleModel.updateRetailSale(req.body, req.params.invoice_no);

    if (!updatedSale) {
      return res.status(404).json({ success: false, message: "Retail sale not found" });
    }

    res.status(200).json({ success: true, message: "Retail sale updated successfully" });
  } catch (err) {
    console.error("Error updating retail sale:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a retail sale
exports.deleteRetailSale = async (req, res) => {
  try {
    const deletedSale = await retailSaleModel.deleteRetailSale(req.params.invoice_no);
    if (!deletedSale) return res.status(404).json({ success: false, message: "Retail sale not found" });
    res.status(200).json({ success: true, message: "Retail sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
