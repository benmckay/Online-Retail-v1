// app.js
const express = require('express');
const app = express();
const productRoutes = require('./src/routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
require('dotenv').config(); // Load environment variables from .env

// Middleware to parse JSON request bodies.
app.use(express.json());

// Use product routes under the /api/products endpoint.
app.use('/src/products', routes);

// Swagger UI setup for interactive API documentation.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Basic endpoint to verify server functionality.
app.get('/', (req, res) => {
  res.send('Welcome to the Online Retail API');
});

// Start the server on the configured port.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
