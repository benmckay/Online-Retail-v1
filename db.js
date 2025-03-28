<<<<<<< HEAD
const { Pool } = require("pg");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not defined in the environment variables.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // For cloud deployments
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error(`❌ Database Connection Error: ${err.message}\nStack Trace: ${err.stack}`));

module.exports = pool;
=======
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // For cloud deployments
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database Connection Error:", err.message));

module.exports = pool;
>>>>>>> c8a65bcf6f2e8f8b03cb4bf3a0116e806549f3c6
