<<<<<<< HEAD
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Retail API",
      version: "1.0.0",
      description: "API documentation for managing customers, products, and orders for Onlin Retail BCS 4103 Project",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"], // To includes all route files
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
=======
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Retail API",
      version: "1.0.0",
      description: "API documentation for managing customers, products, and orders",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"], // Ensure this includes all route files
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
>>>>>>> c8a65bcf6f2e8f8b03cb4bf3a0116e806549f3c6
