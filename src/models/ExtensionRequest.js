const pool = require("../config/db");

class ExtensionRequest {
  // Create a new extension request
  static async create(request) {
    const [result] = await pool.query(
      `INSERT INTO ExtensionRequests (
        task_id, requested_by, request_date, reason, status, decision_date, approved_by, new_deadline
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        request.task_id,
        request.requested_by,
        request.request_date || new Date(),
        request.reason || null,
        request.status || "pending",
        request.decision_date || null,
        request.approved_by || null,
        request.new_deadline || null,
      ]
    );
    return { ...request, id: result.insertId };
  }

  // Retrieve an extension request by ID
  static async getById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM ExtensionRequests WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  // get all requests for specific task
  static async getAllForTask(taskId) {
    const [rows] = await pool.query(
      `SELECT * FROM ExtensionRequests WHERE task_id = ?`,
      [taskId]
    );
    return rows;
  }

  static async updateStatus(
    id,
    status,
    approved_by,
    decision_date,
    new_deadline
  ) {
    const [result] = await pool.query(
      `UPDATE ExtensionRequests 
       SET status = ?, approved_by = ?, decision_date = ?, new_deadline = ?
       WHERE id = ?`,
      [status, approved_by, decision_date, new_deadline, id]
    );
    return result;
  }
}

module.exports = ExtensionRequest;
