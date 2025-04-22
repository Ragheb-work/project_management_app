const pool = require("../config/db");

class User {
  static async create(user) {
    try {
      const [result] = await pool.query(
        "INSERT INTO Users (username, password_hash, email, is_admin) VALUES (?, ?, ?, ?)",
        [user.username, user.password_hash, user.email, user.is_admin || false]
      );
      return { ...user, id: result.insertId };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  static async getByEmail(email) {
    try {
      const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
        email,
      ]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }

  static async update(id, updatedUser) {
    try {
      await pool.query(
        "UPDATE Users SET username = ?, email = ?, password_hash = ? WHERE id = ?",
        [updatedUser.username, updatedUser.email, updatedUser.password_hash, id]
      );
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.query("DELETE FROM Users WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

module.exports = User;
