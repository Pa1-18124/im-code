const pool = require('../config/db');

class TestPackage {
  // Get all test packages
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM testpackages WHERE isactive = true');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get test package by ID
  static async getById(packageId) {
    try {
      const [rows] = await pool.query('SELECT * FROM testpackages WHERE id = ? AND isactive = true', [packageId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get tests included in a package
  static async getTestsInPackage(packageId) {
    try {
      const [rows] = await pool.query(`
        SELECT t.* 
        FROM tests t
        JOIN packagetests pt ON t.id = pt.test_id
        WHERE pt.package_id = ? AND t.isactive = true
      `, [packageId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new test package
  static async create(packageData) {
    try {
      const connection = await pool.getConnection();
      
      try {
        await connection.beginTransaction();
        
        // Insert the package
        const [packageResult] = await connection.query(
          'INSERT INTO testpackages (description, price, discount) VALUES (?, ?, ?)',
          [
            packageData.description,
            packageData.price,
            packageData.discount || 0
          ]
        );
        
        const packageId = packageResult.insertId;
        
        // Insert the tests for the package if provided
        if (packageData.tests && Array.isArray(packageData.tests) && packageData.tests.length > 0) {
          for (const testId of packageData.tests) {
            await connection.query(
              'INSERT INTO packagetests (package_id, test_id) VALUES (?, ?)',
              [packageId, testId]
            );
          }
        }
        
        await connection.commit();
        
        return { 
          id: packageId, 
          description: packageData.description,
          price: packageData.price,
          discount: packageData.discount || 0
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

  // Update test package
  static async update(packageId, packageData) {
    try {
      const connection = await pool.getConnection();
      
      try {
        await connection.beginTransaction();
        
        // Update the package
        const [updateResult] = await connection.query(
          'UPDATE testpackages SET description = ?, price = ?, discount = ? WHERE id = ?',
          [
            packageData.description,
            packageData.price,
            packageData.discount || 0,
            packageId
          ]
        );
        
        // If tests are provided, update them
        if (packageData.tests && Array.isArray(packageData.tests)) {
          // Remove existing tests
          await connection.query(
            'DELETE FROM packagetests WHERE package_id = ?',
            [packageId]
          );
          
          // Add the new tests
          for (const testId of packageData.tests) {
            await connection.query(
              'INSERT INTO packagetests (package_id, test_id) VALUES (?, ?)',
              [packageId, testId]
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

  // Delete test package (soft delete)
  static async delete(packageId) {
    try {
      const [result] = await pool.query('UPDATE testpackages SET isactive = false WHERE id = ?', [packageId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TestPackage; 