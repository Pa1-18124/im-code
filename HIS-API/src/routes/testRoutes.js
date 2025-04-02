const express = require('express');
const testController = require('../controllers/testController');

const router = express.Router();

// GET all tests
router.get('/', testController.getAllTests);

// GET test by ID
router.get('/:id', testController.getTestById);

// GET tests by group ID
router.get('/group/:groupId', testController.getTestsByGroupId);

// POST create new test
router.post('/', testController.createTest);

// PUT update test
router.put('/:id', testController.updateTest);

// DELETE test
router.delete('/:id', testController.deleteTest);

module.exports = router; 