const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const { authMiddleware } = require('../middleware/auth');

// Register new user
router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty().trim()
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Create user
      const userId = await User.create(email, password, name);

      // Generate JWT token
      const token = jwt.sign(
        { id: userId, email, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: userId, email, name, role: 'user' }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error during registration' });
    }
  }
);

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check if user is active
      if (!user.is_active) {
        return res.status(401).json({ error: 'Account is deactivated' });
      }

      // Verify password
      const isMatch = await User.verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Update last login
      User.updateLastLogin(user.id);

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error during login' });
    }
  }
);

// Get current user
router.get('/me', authMiddleware, (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.created_at,
      last_login: user.last_login
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Request password reset
router.post('/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;
      const user = User.findByEmail(email);

      // Don't reveal if user exists or not for security
      if (!user) {
        return res.json({ message: 'If the email exists, a reset link has been sent' });
      }

      // Create reset token
      const token = PasswordReset.create(user.id);

      // In production, send email with token
      // For now, just return the token (should be sent via email)
      console.log(`Password reset token for ${email}: ${token}`);
      
      // TODO: Send email with reset link
      // const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      res.json({ 
        message: 'If the email exists, a reset link has been sent',
        // Remove this in production
        token: process.env.NODE_ENV === 'development' ? token : undefined
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Reset password
router.post('/reset-password',
  [
    body('token').notEmpty(),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { token, password } = req.body;

      // Find valid token
      const resetRequest = PasswordReset.findValidToken(token);
      if (!resetRequest) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      // Update password
      await User.updatePassword(resetRequest.user_id, password);

      // Mark token as used
      PasswordReset.markAsUsed(token);

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
