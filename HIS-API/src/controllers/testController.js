const Test = require('../models/testModel');

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.getAll();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tests', error: error.message });
  }
};

// Get test by ID
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.getById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving test', error: error.message });
  }
};

// Get tests by group ID
exports.getTestsByGroupId = async (req, res) => {
  try {
    const tests = await Test.getByGroupId(req.params.groupId);
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tests by group', error: error.message });
  }
};

// Create new test
exports.createTest = async (req, res) => {
  try {
    if (!req.body.description || !req.body.testgroup_id) {
      return res.status(400).json({ message: 'Description and test group ID are required' });
    }

    const newTest = await Test.create(req.body);
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error: error.message });
  }
};

// Update test
exports.updateTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const test = await Test.getById(testId);
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const updated = await Test.update(testId, req.body);
    if (updated) {
      res.status(200).json({ message: 'Test updated successfully' });
    } else {
      res.status(400).json({ message: 'Test could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating test', error: error.message });
  }
};

// Delete test
exports.deleteTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const test = await Test.getById(testId);
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const deleted = await Test.delete(testId);
    if (deleted) {
      res.status(200).json({ message: 'Test deleted successfully' });
    } else {
      res.status(400).json({ message: 'Test could not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting test', error: error.message });
  }
}; 