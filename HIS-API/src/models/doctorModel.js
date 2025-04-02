const pool = require('../config/db');

class Doctor {
  // Get all doctors
  static async getAll() {
    try {
      const [rows] = await pool.query(`
        SELECT d.*, u.username, u.email 
        FROM doctors d
        LEFT JOIN users u ON d.user_id = u.id
        WHERE d.isactive = true
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get doctor by ID
  static async getById(doctorId) {
    try {
      const [rows] = await pool.query(`
        SELECT d.*, u.username, u.email 
        FROM doctors d
        LEFT JOIN users u ON d.user_id = u.id
        WHERE d.id = ? AND d.isactive = true
      `, [doctorId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new doctor
  static async create(doctorData) {
    try {
      const [result] = await pool.query(
        'INSERT INTO doctors (firstname, lastname, specialization, user_id) VALUES (?, ?, ?, ?)',
        [
          doctorData.firstname,
          doctorData.lastname,
          doctorData.specialization,
          doctorData.user_id || null
        ]
      );
      return { id: result.insertId, ...doctorData };
    } catch (error) {
      throw error;
    }
  }

  // Update doctor
  static async update(doctorId, doctorData) {
    try {
      const [result] = await pool.query(
        'UPDATE doctors SET firstname = ?, lastname = ?, specialization = ?, user_id = ? WHERE id = ?',
        [
          doctorData.firstname,
          doctorData.lastname,
          doctorData.specialization,
          doctorData.user_id,
          doctorId
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete doctor (soft delete)
  static async delete(doctorId) {
    try {
      const [result] = await pool.query('UPDATE doctors SET isactive = false WHERE id = ?', [doctorId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Doctor; 