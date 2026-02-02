/**
 * ID Generator - Utility for generating unique identifiers
 */

class IdGenerator {
  constructor() {
    this.counter = 1000; // Start from 1000 for better looking IDs
  }

  /**
   * Generate a unique numeric ID
   */
  generateNumericId() {
    return this.counter++;
  }

  /**
   * Generate a UUID-like string ID
   */
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Generate a prefixed ID for plant models
   */
  generateModelId(prefix = 'PM') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 7);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Generate a version ID
   */
  generateVersionId(modelId, version) {
    return `${modelId}-v${version.replace(/\./g, '')}`;
  }

  /**
   * Reset counter (for testing purposes)
   */
  resetCounter(start = 1000) {
    this.counter = start;
  }
}

module.exports = new IdGenerator();
