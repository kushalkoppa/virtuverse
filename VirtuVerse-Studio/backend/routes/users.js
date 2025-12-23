const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const users = User.getAll();
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user status (admin only)
router.put('/:id/status', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    User.updateStatus(id, isActive);
    res.json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
