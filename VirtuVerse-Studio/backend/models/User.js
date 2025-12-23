const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create a new user
  static async create(email, password, name, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(`
      INSERT INTO users (email, password, name, role)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(email, hashedPassword, name, role);
    return result.lastInsertRowid;
  }

  // Find user by email
  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  // Find user by ID
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update last login
  static updateLastLogin(userId) {
    const stmt = db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(userId);
  }

  // Update password
  static async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const stmt = db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(hashedPassword, userId);
  }

  // Get all users (admin only)
  static getAll() {
    const stmt = db.prepare('SELECT id, email, name, role, created_at, last_login, is_active FROM users');
    return stmt.all();
  }

  // Update user status
  static updateStatus(userId, isActive) {
    const stmt = db.prepare('UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(isActive ? 1 : 0, userId);
  }
}

module.exports = User;
