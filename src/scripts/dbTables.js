const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { pool } = require("../config/db.js");

const createTables = async () => {
  try {
    const connection = await pool.getConnection();

    // Create `users` table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Create `projects` table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        start_date DATE,
        end_date DATE,
        manager_id INT NOT NULL,
        monitor_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (monitor_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_project_manager (manager_id),
        INDEX idx_project_monitor (monitor_id)
      );
    `);

    // Create `tasks` table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL,
        description TEXT NOT NULL,
        executor_id INT NOT NULL,
        start_date DATE,
        initial_deadline DATE,
        extension_deadline_1 DATE,
        extension_deadline_2 DATE,
        current_deadline DATE,
        extension_count INT DEFAULT 0,
        status ENUM('in_progress', 'completed', 'overdue') DEFAULT 'in_progress',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (executor_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_task_project (project_id),
        INDEX idx_task_executor (executor_id),
        INDEX idx_task_status (status)
      );
    `);

    // Create `extension_requests` table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS extension_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task_id INT NOT NULL,
        requested_by INT NOT NULL,
        request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reason TEXT,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        decision_date TIMESTAMP NULL,
        approved_by INT NULL,
        new_deadline DATE NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_extension_task (task_id),
        INDEX idx_extension_status (status)
      );
    `);

    console.log("✅ Tables with indexes created successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
};

// Run script
createTables();
