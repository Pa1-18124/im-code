const pool = require('../config/db');

class Patient {
  // Get all patients
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM patients WHERE isactive = true');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get patient by ID
  static async getById(patientId) {
    try {
      const [rows] = await pool.query('SELECT * FROM patients WHERE id = ? AND isactive = true', [patientId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Search patients by name
  static async searchByName(searchTerm) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM patients WHERE (firstname LIKE ? OR lastname LIKE ?) AND isactive = true', 
        [`%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new patient
  static async create(patientData) {
    try {
      const [result] = await pool.query(
        'INSERT INTO patients (firstname, lastname, gender, dateofbirth, address, contactnumber, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          patientData.firstname,
          patientData.lastname,
          patientData.gender,
          patientData.dateofbirth,
          patientData.address,
          patientData.contactnumber,
          patientData.email
        ]
      );
      return { id: result.insertId, ...patientData };
    } catch (error) {
      throw error;
    }
  }

  // Update patient
  static async update(patientId, patientData) {
    try {
      const [result] = await pool.query(
        'UPDATE patients SET firstname = ?, lastname = ?, gender = ?, dateofbirth = ?, address = ?, contactnumber = ?, email = ? WHERE id = ?',
        [
          patientData.firstname,
          patientData.lastname,
          patientData.gender,
          patientData.dateofbirth,
          patientData.address,
          patientData.contactnumber,
          patientData.email,
          patientId
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete patient (soft delete)
  static async delete(patientId) {
    try {
      const [result] = await pool.query('UPDATE patients SET isactive = false WHERE id = ?', [patientId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Patient; 