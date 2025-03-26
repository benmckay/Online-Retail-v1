require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Database connection
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const customerRoutes = require("./routes/customers");


const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON



// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Compare this snippet from Online-Retail-v1/server.js:
app.use(express.json());

// API Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Connected to database at ${DATABASE_URL}`);
});