const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "Retail",
  password: process.env.DB_PASSWORD || "Password",
  port: process.env.DB_PORT || 5432,
});
// Test the connection
pool.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the Postgres Retail database");
  }
});
// Export the pool for use in other modules
// This allows us to use the pool in our models
// and controllers to interact with the database
// For example:
// const pool = require("./db");
// const result = await pool.query("SELECT * FROM products");
// console.log(result.rows);
// This is a simple connection pool for PostgreSQL
// using the pg library.
// It allows us to connect to the database and run queries.
module.exports = pool;
