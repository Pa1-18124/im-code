const pool = require('../config/db');

class PatientCase {
  // Get all patient cases
  static async getAll() {
    try {
      const [rows] = await pool.query(`
        SELECT pc.*, 
               p.firstname as patient_firstname, p.lastname as patient_lastname,
               d.firstname as doctor_firstname, d.lastname as doctor_lastname
        FROM patientcases pc
        LEFT JOIN patients p ON pc.patient_id = p.id
        LEFT JOIN doctors d ON pc.doctor_id = d.id
        WHERE pc.isactive = true
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get patient case by ID
  static async getById(caseId) {
    try {
      const [rows] = await pool.query(`
        SELECT pc.*, 
               p.firstname as patient_firstname, p.lastname as patient_lastname,
               d.firstname as doctor_firstname, d.lastname as doctor_lastname
        FROM patientcases pc
        LEFT JOIN patients p ON pc.patient_id = p.id
        LEFT JOIN doctors d ON pc.doctor_id = d.id
        WHERE pc.id = ? AND pc.isactive = true
      `, [caseId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get cases by patient ID
  static async getByPatientId(patientId) {
    try {
      const [rows] = await pool.query(`
        SELECT pc.*, 
               p.firstname as patient_firstname, p.lastname as patient_lastname,
               d.firstname as doctor_firstname, d.lastname as doctor_lastname
        FROM patientcases pc
        LEFT JOIN patients p ON pc.patient_id = p.id
        LEFT JOIN doctors d ON pc.doctor_id = d.id
        WHERE pc.patient_id = ? AND pc.isactive = true
        ORDER BY pc.casedate DESC
      `, [patientId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get cases by doctor ID
  static async getByDoctorId(doctorId) {
    try {
      const [rows] = await pool.query(`
        SELECT pc.*, 
               p.firstname as patient_firstname, p.lastname as patient_lastname,
               d.firstname as doctor_firstname, d.lastname as doctor_lastname
        FROM patientcases pc
        LEFT JOIN patients p ON pc.patient_id = p.id
        LEFT JOIN doctors d ON pc.doctor_id = d.id
        WHERE pc.doctor_id = ? AND pc.isactive = true
        ORDER BY pc.casedate DESC
      `, [doctorId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new patient case
  static async create(caseData) {
    try {
      const [result] = await pool.query(
        'INSERT INTO patientcases (patient_id, doctor_id, casedate, diagnosis, notes) VALUES (?, ?, ?, ?, ?)',
        [
          caseData.patient_id,
          caseData.doctor_id,
          caseData.casedate || new Date(),
          caseData.diagnosis,
          caseData.notes
        ]
      );
      return { id: result.insertId, ...caseData };
    } catch (error) {
      throw error;
    }
  }

  // Update patient case
  static async update(caseId, caseData) {
    try {
      const [result] = await pool.query(
        'UPDATE patientcases SET patient_id = ?, doctor_id = ?, casedate = ?, diagnosis = ?, notes = ? WHERE id = ?',
        [
          caseData.patient_id,
          caseData.doctor_id,
          caseData.casedate,
          caseData.diagnosis,
          caseData.notes,
          caseId
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete patient case (soft delete)
  static async delete(caseId) {
    try {
      const [result] = await pool.query('UPDATE patientcases SET isactive = false WHERE id = ?', [caseId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PatientCase; 