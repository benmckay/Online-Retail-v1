const pool = require("../db");
const productModel = require("../models/productModel"); // Import the model

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getProducts(); // Fixed method name
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id); // Fixed method name
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    // Validate required fields
    if (!name || !price || stock === undefined) {
      return res.status(400).json({ error: "Name, price, and stock are required" });
    }

    const newProduct = await productModel.createProduct({ name, description, price, stock }); // Pass as an object

    // Return success response with the created product details
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ error: "An error occurred while creating the product" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    // Validate required fields
    if (!name || !price || stock === undefined) {
      return res.status(400).json({ error: "Name, price, and stock are required" });
    }

    const updatedProduct = await productModel.updateProduct(req.params.id, { name, description, price, stock }); // Pass as an object

    // Handle case where the product does not exist
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return success response with the updated product details
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ error: "An error occurred while updating the product" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate the product ID
    if (!productId || isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Check if the product is referenced in order_details
    const isReferenced = await productModel.isProductReferenced(parseInt(productId));
    if (isReferenced) {
      return res.status(400).json({ error: "Cannot delete product as it is referenced in order details" });
    }

    const deletedProduct = await productModel.deleteProduct(parseInt(productId)); // Ensure ID is parsed as an integer

    // Return success response with the deleted product details
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    if (error.message === "Product not found") {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: "An error occurred while deleting the product" });
  }
};
