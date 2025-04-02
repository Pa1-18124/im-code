const express = require('express');
const testGroupController = require('../controllers/testGroupController');

const router = express.Router();

// GET all test groups
router.get('/', testGroupController.getAllTestGroups);

// GET test group by ID
router.get('/:id', testGroupController.getTestGroupById);

// POST create new test group
router.post('/', testGroupController.createTestGroup);

// PUT update test group
router.put('/:id', testGroupController.updateTestGroup);

// DELETE test group
router.delete('/:id', testGroupController.deleteTestGroup);

module.exports = router; 