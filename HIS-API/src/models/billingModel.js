const pool = require('../config/db');

class Billing {
  // Get all billings
  static async getAll() {
    try {
      const [rows] = await pool.query(`
        SELECT b.*, 
               p.firstname as patient_firstname, p.lastname as patient_lastname, 
               pc.diagnosis as case_diagnosis
        FROM billings b
        LEFT JOIN patients p ON b.patient_id = p.id
        LEFT JOIN patientcases pc ON b.case_id = pc.id
        WHERE b.isactive = true
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get billing by ID
  static async getById(billingId) {
    try {
      const [rows] = await pool.query(`
        SELECT b.*, 
               p.firstname as patient_firstname, p.lastname as patient_lastname, 
               pc.diagnosis as case_diagnosis
        FROM billings b
        LEFT JOIN patients p ON b.patient_id = p.id
        LEFT JOIN patientcases pc ON b.case_id = pc.id
        WHERE b.id = ? AND b.isactive = true
      `, [billingId]);
      
      if (rows.length === 0) {
        return null;
      }
      
      // Get billing items
      const billingData = rows[0];
      const [itemRows] = await pool.query(`
        SELECT bi.*, t.description as test_name, tp.description as package_name
        FROM billingitems bi
        LEFT JOIN tests t ON bi.test_id = t.id AND bi.item_type = 'test'
        LEFT JOIN testpackages tp ON bi.package_id = tp.id AND bi.item_type = 'package'
        WHERE bi.billing_id = ?
      `, [billingId]);
      
      billingData.items = itemRows;
      
      return billingData;
    } catch (error) {
      throw error;
    }
  }

  // Get billings by patient ID
  static async getByPatientId(patientId) {
    try {
      const [rows] = await pool.query(`
        SELECT b.*, 
               p.firstname as patient_firstname, p.lastname as patient_lastname, 
               pc.diagnosis as case_diagnosis
        FROM billings b
        LEFT JOIN patients p ON b.patient_id = p.id
        LEFT JOIN patientcases pc ON b.case_id = pc.id
        WHERE b.patient_id = ? AND b.isactive = true
      `, [patientId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new billing
  static async create(billingData) {
    try {
      const connection = await pool.getConnection();
      
      try {
        await connection.beginTransaction();
        
        // Insert the billing
        const [billingResult] = await connection.query(
          'INSERT INTO billings (patient_id, case_id, billing_date, total_amount, payment_status, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            billingData.patient_id,
            billingData.case_id,
            billingData.billing_date || new Date(),
            billingData.total_amount || 0,
            billingData.payment_status || 'Pending',
            billingData.payment_method,
            billingData.notes
          ]
        );
        
        const billingId = billingResult.insertId;
        
        // Insert the billing items if provided
        if (billingData.items && Array.isArray(billingData.items) && billingData.items.length > 0) {
          for (const item of billingData.items) {
            await connection.query(
              'INSERT INTO billingitems (billing_id, item_type, test_id, package_id, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
              [
                billingId,
                item.item_type,
                item.test_id || null,
                item.package_id || null,
                item.price,
                item.quantity || 1
              ]
            );
          }
        }
        
        await connection.commit();
        
        return { 
          id: billingId, 
          ...billingData
        };
        
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }

  // Update billing
  static async update(billingId, billingData) {
    try {
      const connection = await pool.getConnection();
      
      try {
        await connection.beginTransaction();
        
        // Update the billing
        const [updateResult] = await connection.query(
          'UPDATE billings SET patient_id = ?, case_id = ?, billing_date = ?, total_amount = ?, payment_status = ?, payment_method = ?, notes = ? WHERE id = ?',
          [
            billingData.patient_id,
            billingData.case_id,
            billingData.billing_date,
            billingData.total_amount,
            billingData.payment_status,
            billingData.payment_method,
            billingData.notes,
            billingId
          ]
        );
        
        // If items are provided, update them
        if (billingData.items && Array.isArray(billingData.items)) {
          // Remove existing items
          await connection.query(
            'DELETE FROM billingitems WHERE billing_id = ?',
            [billingId]
          );
          
          // Add the new items
          for (const item of billingData.items) {
            await connection.query(
              'INSERT INTO billingitems (billing_id, item_type, test_id, package_id, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
              [
                billingId,
                item.item_type,
                item.test_id || null,
                item.package_id || null,
                item.price,
                item.quantity || 1
              ]
            );
          }
        }
        
        await connection.commit();
        
        return updateResult.affectedRows > 0;
        
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }

  // Delete billing (soft delete)
  static async delete(billingId) {
    try {
      const [result] = await pool.query('UPDATE billings SET isactive = false WHERE id = ?', [billingId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Billing; 