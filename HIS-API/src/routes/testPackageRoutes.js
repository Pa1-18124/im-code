const express = require('express');
const testPackageController = require('../controllers/testPackageController');

const router = express.Router();

// GET all test packages
router.get('/', testPackageController.getAllTestPackages);

// GET test package by ID
router.get('/:id', testPackageController.getTestPackageById);

// GET tests in a package
router.get('/:id/tests', testPackageController.getTestsInPackage);

// POST create new test package
router.post('/', testPackageController.createTestPackage);

// PUT update test package
router.put('/:id', testPackageController.updateTestPackage);

// DELETE test package
router.delete('/:id', testPackageController.deleteTestPackage);

module.exports = router; 