const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const productRoutes = require('./src/routes/products');
const pool = require('./src/config/db');

const app = express();
const swaggerDoc = YAML.load('./swagger/swagger.yaml');

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));