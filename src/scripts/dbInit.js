// require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mysql = require("mysql2/promise");

const createDatabase = async () => {
  try {
    // Connect to MySQL (without selecting a database yet)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log("✅ Connected to MySQL");

    // Create database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(
      `✅ Database '${process.env.DB_NAME}' created or already exists.`
    );

    // Close connection
    await connection.end();
  } catch (error) {
    console.error("❌ Error creating database:", error);
    console.log("✅ DB Host:", process.env.DB_HOST);
    console.log("✅ DB User:", process.env.DB_USER);
  }
};

// Run script
createDatabase();
