<<<<<<< HEAD
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL is not defined in the environment variables.");
  console.error("Ensure the .env file exists in the root directory and contains the DATABASE_URL variable.");
  process.exit(1); // Exit the process with an error code
}

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

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

const dbConfig = {
    user: 'postgres',
    host: 'localhost', // Ensure this is correct
    database: 'Retail',
    password: 'Karanja8', // Replace with your actual password
    port: 5432,
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Connected to database at ${DATABASE_URL}`);
=======
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
>>>>>>> c8a65bcf6f2e8f8b03cb4bf3a0116e806549f3c6
});