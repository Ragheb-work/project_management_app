const pool = require("../config/db");

class Project {
  // Create a new project
  static async create(project) {
    try {
      const [result] = await pool.query(
        "INSERT INTO Projects (name, description, start_date, end_date, manager_id, monitor_id) VALUES (?, ?, ?, ?, ?, ?)",
        [
          project.name,
          project.description || null,
          project.start_date || null,
          project.end_date || null,
          project.manager_id,
          project.monitor_id || null,
        ]
      );

      return {
        ...project,
        id: result.insertId,
        created_at: new Date(),
        updated_at: new Date(),
      };
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  // Retrieve a project by ID
  static async getById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM Projects WHERE id = ?", [
        id,
      ]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching project by ID:", error);
      throw error;
    }
  }

  // Fetch all projects
  static async getAll() {
    try {
      const [rows] = await pool.query("SELECT * FROM Projects");
      return rows;
    } catch (error) {
      console.error("Error fetching all projects:", error);
      throw error;
    }
  }

  // Update a project
  static async update(id, data) {
    try {
      const [result] = await pool.query(
        `UPDATE Projects SET 
         name = ?, description = ?, 
        start_date = ?, end_date = ?, monitor_id = ?, updated_at = NOW() 
       WHERE id = ?`,
        [
          data.name,
          data.description || null,
          data.start_date,
          data.end_date,
          data.monitor_id,
          id,
        ]
      );

      return this.getById(id);
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  // Delete a project
  static async delete(id) {
    try {
      await pool.query("DELETE FROM Projects WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }
  // Additional methods (update, delete) can be added here
}

module.exports = Project;
