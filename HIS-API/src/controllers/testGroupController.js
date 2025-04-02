const TestGroup = require('../models/testGroupModel');

// Get all test groups
exports.getAllTestGroups = async (req, res) => {
  try {
    const testGroups = await TestGroup.getAll();
    res.status(200).json(testGroups);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving test groups', error: error.message });
  }
};

// Get test group by ID
exports.getTestGroupById = async (req, res) => {
  try {
    const testGroup = await TestGroup.getById(req.params.id);
    if (!testGroup) {
      return res.status(404).json({ message: 'Test group not found' });
    }
    res.status(200).json(testGroup);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving test group', error: error.message });
  }
};

// Create new test group
exports.createTestGroup = async (req, res) => {
  try {
    if (!req.body.description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const newTestGroup = await TestGroup.create(req.body);
    res.status(201).json(newTestGroup);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test group', error: error.message });
  }
};

// Update test group
exports.updateTestGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const testGroup = await TestGroup.getById(groupId);
    
    if (!testGroup) {
      return res.status(404).json({ message: 'Test group not found' });
    }

    const updated = await TestGroup.update(groupId, req.body);
    if (updated) {
      res.status(200).json({ message: 'Test group updated successfully' });
    } else {
      res.status(400).json({ message: 'Test group could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating test group', error: error.message });
  }
};

// Delete test group
exports.deleteTestGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const testGroup = await TestGroup.getById(groupId);
    
    if (!testGroup) {
      return res.status(404).json({ message: 'Test group not found' });
    }

    const deleted = await TestGroup.delete(groupId);
    if (deleted) {
      res.status(200).json({ message: 'Test group deleted successfully' });
    } else {
      res.status(400).json({ message: 'Test group could not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting test group', error: error.message });
  }
}; 