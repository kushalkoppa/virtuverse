/**
 * PlantModel - Data structure for plant simulation models
 * Manages plant model metadata, versioning, and relationships
 */

class PlantModel {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.type = data.type || 'Plant Simulation';
    this.version = data.version || '1.0.0';
    this.filePath = data.filePath || null;
    this.fileSize = data.fileSize || 0;
    this.status = data.status || 'active';
    
    // Metadata
    this.metadata = {
      author: data.metadata?.author || 'Unknown',
      modifiedDate: data.metadata?.modifiedDate || new Date().toISOString(),
      sourceTool: data.metadata?.sourceTool || 'Unknown',
      interfaces: data.metadata?.interfaces || [],
      compatibility: data.metadata?.compatibility || {
        environmentModels: 0,
        virtualECUs: 0,
        plantModels: 0
      }
    };
    
    // Versioning
    this.versionHistory = data.versionHistory || [];
    this.parentVersion = data.parentVersion || null;
    
    // Timestamps
    this.createdAt = data.createdAt || new Date().toISOString();
    this.lastModified = data.lastModified || new Date().toISOString();
  }

  /**
   * Create a new version of this model
   */
  createNewVersion(updates) {
    const newVersion = this.incrementVersion();
    return new PlantModel({
      ...this,
      ...updates,
      version: newVersion,
      parentVersion: this.version,
      versionHistory: [
        ...this.versionHistory,
        {
          version: this.version,
          timestamp: this.lastModified,
          changes: updates.changeDescription || 'Updated model'
        }
      ],
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Increment version number (semantic versioning)
   */
  incrementVersion() {
    const parts = this.version.split('.').map(Number);
    parts[2]++; // Increment patch version
    return parts.join('.');
  }

  /**
   * Convert to JSON representation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      version: this.version,
      filePath: this.filePath,
      fileSize: this.fileSize,
      status: this.status,
      metadata: this.metadata,
      versionHistory: this.versionHistory,
      parentVersion: this.parentVersion,
      createdAt: this.createdAt,
      lastModified: this.lastModified
    };
  }
}

module.exports = PlantModel;
