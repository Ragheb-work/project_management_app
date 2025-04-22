const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const seedDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("✅ Connected to the database for seeding!");

  // Hash the admin password
  const hashedPassword = await bcrypt.hash("admin", 10);

  // Insert Admin User
  await connection.execute(
    `INSERT INTO Users (username, email, password_hash, is_admin) 
    VALUES ('admin', 'admin@example.com', ?, TRUE)
    ON DUPLICATE KEY UPDATE email=email;`,
    [hashedPassword]
  );

  console.log("✅ Admin user inserted successfully!");

  await connection.end();
};

// Run the seeding script
seedDatabase().catch((err) => {
  console.error("❌ Error seeding database:", err);
});
