require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Retail API",
      version: "1.0.0",
      description: "API documentation for the Online Retail system",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Adjust the path to your route files
});

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// API Routes
app.use("/api/customers", require("./routes/customers"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/retailSales", require("./routes/retailSales"));

// Swagger Docs Route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
  console.log(`Swagger Docs available at http://localhost:${PORT}/api/docs`);
});