const productModel = require("../models/productModel"); // Import the model

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getproducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productModel.getproductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newProduct = await productModel.createproduct(name, email);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedProduct = await productModel.updateproduct(req.params.id, name, email);
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await productModel.deleteproduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }};
// Compare this snippet from Online-Retail-v1/routes/index.js: