const User = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    // Check if username or email already exists
    const existingUser = await User.findByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.getById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updated = await User.update(userId, req.body);
    if (updated) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(400).json({ message: 'User could not be updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.getById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deleted = await User.delete(userId);
    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(400).json({ message: 'User could not be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}; 