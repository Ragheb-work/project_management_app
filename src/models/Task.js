const pool = require("../config/db");

class Task {
  // Create a new task
  static async create(task) {
    try {
      const [result] = await pool.query(
        `INSERT INTO Tasks (
            project_id, description, executor_id, start_date, 
            initial_deadline, extension_deadline_1, extension_deadline_2, 
            current_deadline, extension_count, status
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          task.project_id,
          task.description,
          task.executor_id,
          task.start_date || null,
          task.initial_deadline || null,
          task.extension_deadline_1 || null,
          task.extension_deadline_2 || null,
          task.current_deadline || task.initial_deadline || null,
          task.extension_count || 0,
          task.status || "in_progress",
        ]
      );

      return {
        ...task,
        id: result.insertId,
        created_at: new Date(),
        updated_at: new Date(),
      };
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  // Retrieve a task by ID
  static async getById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM Tasks WHERE id = ?", [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      throw error;
    }
  }

  // Get all tasks
  static async getAll() {
    try {
      const [rows] = await pool.query("SELECT * FROM Tasks");
      return rows;
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      throw error;
    }
  }

  // Update task
  static async update(id, data) {
    try {
      const fields = [];
      const values = [];

      for (const key in data) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }

      await pool.query(
        `UPDATE Tasks SET ${fields.join(
          ", "
        )}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [...values, id]
      );

      return await this.getById(id);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  // Delete task
  static async delete(id) {
    try {
      await pool.query("DELETE FROM Tasks WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
  //update deadline of a task once approved by the manager or the monitor
  static async updateDeadline(taskId, newDeadline) {
    try {
      await pool.query(
        "UPDATE Tasks SET current_deadline = ?, updated_at = NOW() WHERE id = ?",
        [newDeadline, taskId]
      );
    } catch (error) {
      console.error("Error updating deadline:", error);
      throw error;
    }
  }
}

module.exports = Task;
