const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const extensionRequestRoutes = require("./routes/extensionRequestRoutes");
const { pool } = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("show databases");
    res.json({
      message: "Database connected!",
      result: rows[0].solution,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Mounting routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/extensions", extensionRequestRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
