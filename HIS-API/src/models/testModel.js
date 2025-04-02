const pool = require('../config/db');

class Test {
  // Get all tests
  static async getAll() {
    try {
      const [rows] = await pool.query(`
        SELECT t.*, tg.description as group_name
        FROM tests t
        LEFT JOIN testgroups tg ON t.testgroup_id = tg.id
        WHERE t.isactive = true
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get test by ID
  static async getById(testId) {
    try {
      const [rows] = await pool.query(`
        SELECT t.*, tg.description as group_name
        FROM tests t
        LEFT JOIN testgroups tg ON t.testgroup_id = tg.id
        WHERE t.id = ? AND t.isactive = true
      `, [testId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get tests by group ID
  static async getByGroupId(groupId) {
    try {
      const [rows] = await pool.query(`
        SELECT t.*, tg.description as group_name
        FROM tests t
        LEFT JOIN testgroups tg ON t.testgroup_id = tg.id
        WHERE t.testgroup_id = ? AND t.isactive = true
      `, [groupId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new test
  static async create(testData) {
    try {
      const [result] = await pool.query(
        'INSERT INTO tests (description, normal_range, units, price, testgroup_id) VALUES (?, ?, ?, ?, ?)',
        [
          testData.description,
          testData.normal_range,
          testData.units,
          testData.price,
          testData.testgroup_id
        ]
      );
      return { id: result.insertId, ...testData };
    } catch (error) {
      throw error;
    }
  }

  // Update test
  static async update(testId, testData) {
    try {
      const [result] = await pool.query(
        'UPDATE tests SET description = ?, normal_range = ?, units = ?, price = ?, testgroup_id = ? WHERE id = ?',
        [
          testData.description,
          testData.normal_range,
          testData.units,
          testData.price,
          testData.testgroup_id,
          testId
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete test (soft delete)
  static async delete(testId) {
    try {
      const [result] = await pool.query('UPDATE tests SET isactive = false WHERE id = ?', [testId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Test; 