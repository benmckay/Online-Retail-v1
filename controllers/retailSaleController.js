const retailSaleModel = require("../models/retailSaleModel");

// Get all retail sales with pagination
exports.getAllRetailSales = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    // Validate and sanitize query parameters
    page = Math.max(1, parseInt(page));
    limit = Math.max(1, Math.min(100, parseInt(limit)));

    const offset = (page - 1) * limit;

    const sales = await retailSaleModel.getRetailSalesWithPagination(limit, offset);
    const total = await retailSaleModel.getRetailSalesCount();

    // Generate HTML table
    let tableHTML = `
      <table border="1">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Stock Code</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Invoice Date</th>
            <th>Unit Price</th>
            <th>Customer ID</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
    `;

    sales.forEach(sale => {
      tableHTML += `
        <tr>
          <td>${sale.invoice_no}</td>
          <td>${sale.stock_code}</td>
          <td>${sale.description}</td>
          <td>${sale.quantity}</td>
          <td>${new Date(sale.invoice_date).toLocaleString()}</td>
          <td>${sale.unit_price}</td>
          <td>${sale.customer_id}</td>
          <td>${sale.country}</td>
        </tr>
      `;
    });

    tableHTML += `
        </tbody>
      </table>
      <p>Page ${page} of ${Math.ceil(total / limit)}</p>
    `;

    res.status(200).send(tableHTML);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch retail sales",
      error: err.message,
    });
  }
};

// Get a single retail sale by invoice_no
exports.getRetailSaleByInvoiceNo = async (req, res) => {
  try {
    const sale = await retailSaleModel.getRetailSaleByInvoiceNo(req.params.invoice_no);
    if (!sale) return res.status(404).json({ success: false, message: "Retail sale not found" });
    res.status(200).json({ success: true, data: sale });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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

    const updatedSale = await retailSaleModel.updateRetailSale(req.params.invoice_no, req.body);

    if (!updatedSale) {
      return res.status(404).json({ success: false, message: "Retail sale not found" });
    }

    res.status(200).json({ success: true, message: "Retail sale updated successfully", data: updatedSale });
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
    res.status(200).json({ success: true, message: "Retail sale deleted successfully", data: deletedSale });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
