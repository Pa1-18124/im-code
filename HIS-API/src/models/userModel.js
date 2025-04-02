const pool = require('../config/db');

class User {
  // Get all users
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE isactive = true');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get user by ID
  static async getById(userId) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ? AND isactive = true', [userId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new user
  static async create(userData) {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, password, email, firstname, lastname, isattendingdoctor, istechnician, isadmin, isstaff) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          userData.username,
          userData.password,
          userData.email,
          userData.firstname,
          userData.lastname,
          userData.isattendingdoctor || false,
          userData.istechnician || false,
          userData.isadmin || false,
          userData.isstaff || false
        ]
      );
      return { id: result.insertId, ...userData };
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async update(userId, userData) {
    try {
      const [result] = await pool.query(
        'UPDATE users SET username = ?, password = ?, email = ?, firstname = ?, lastname = ?, isattendingdoctor = ?, istechnician = ?, isadmin = ?, isstaff = ? WHERE id = ?',
        [
          userData.username,
          userData.password,
          userData.email,
          userData.firstname,
          userData.lastname,
          userData.isattendingdoctor,
          userData.istechnician,
          userData.isadmin,
          userData.isstaff,
          userId
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete user (soft delete)
  static async delete(userId) {
    try {
      const [result] = await pool.query('UPDATE users SET isactive = false WHERE id = ?', [userId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND isactive = true', [username]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User; 