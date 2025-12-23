const db = require('../config/database');
const crypto = require('crypto');

class PasswordReset {
  // Create a password reset token
  static create(userId, expiresInHours = 24) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO password_resets (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `);
    stmt.run(userId, token, expiresAt);
    
    return token;
  }

  // Find valid token
  static findValidToken(token) {
    const stmt = db.prepare(`
      SELECT pr.*, u.email, u.name
      FROM password_resets pr
      JOIN users u ON pr.user_id = u.id
      WHERE pr.token = ? AND pr.used = 0 AND pr.expires_at > datetime('now')
    `);
    return stmt.get(token);
  }

  // Mark token as used
  static markAsUsed(token) {
    const stmt = db.prepare('UPDATE password_resets SET used = 1 WHERE token = ?');
    stmt.run(token);
  }

  // Clean up expired tokens
  static cleanExpired() {
    const stmt = db.prepare("DELETE FROM password_resets WHERE expires_at < datetime('now')");
    stmt.run();
  }
}

module.exports = PasswordReset;
