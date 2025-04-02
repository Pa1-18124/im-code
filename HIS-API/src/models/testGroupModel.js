const pool = require('../config/db');

class TestGroup {
  // Get all test groups
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM testgroups WHERE isactive = true');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get test group by ID
  static async getById(groupId) {
    try {
      const [rows] = await pool.query('SELECT * FROM testgroups WHERE id = ? AND isactive = true', [groupId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new test group
  static async create(groupData) {
    try {
      const [result] = await pool.query(
        'INSERT INTO testgroups (description) VALUES (?)',
        [groupData.description]
      );
      return { id: result.insertId, ...groupData };
    } catch (error) {
      throw error;
    }
  }

  // Update test group
  static async update(groupId, groupData) {
    try {
      const [result] = await pool.query(
        'UPDATE testgroups SET description = ? WHERE id = ?',
        [groupData.description, groupId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete test group (soft delete)
  static async delete(groupId) {
    try {
      const [result] = await pool.query('UPDATE testgroups SET isactive = false WHERE id = ?', [groupId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TestGroup; 