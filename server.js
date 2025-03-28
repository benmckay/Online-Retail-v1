require("dotenv").config();
const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const customerRoutes = require("./routes/customers");
const retailSalesRoutes = require("./routes/retailSales");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/retailSales", retailSalesRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Online Retail API!");
});

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});