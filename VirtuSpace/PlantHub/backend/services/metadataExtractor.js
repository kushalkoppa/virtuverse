/**
 * MetadataExtractor - Service for extracting metadata from plant models
 * Analyzes model files and extracts relevant information
 */

const fs = require('fs').promises;
const path = require('path');

class MetadataExtractor {
  /**
   * Extract complete metadata from a plant model file
   */
  async extractMetadata(filePath, fileName) {
    try {
      const metadata = {
        author: await this.extractAuthor(filePath),
        modifiedDate: await this.extractModifiedDate(filePath),
        sourceTool: this.detectSourceTool(fileName, filePath),
        interfaces: await this.extractInterfaces(filePath),
        compatibility: this.calculateCompatibility(filePath, fileName)
      };

      return metadata;
    } catch (error) {
      console.error('Error extracting metadata:', error);
      return this.getDefaultMetadata();
    }
  }

  /**
   * Extract author from file
   * In a real implementation, this would parse the file format
   */
  async extractAuthor(filePath) {
    try {
      const stats = await fs.stat(filePath);
      // Placeholder: In production, parse file content for author
      return process.env.DEFAULT_AUTHOR || 'System';
    } catch (error) {
      return 'Unknown';
    }
  }

  /**
   * Extract modified date from file system
   */
  async extractModifiedDate(filePath) {
    try {
      const stats = await fs.stat(filePath);
      return stats.mtime.toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  }

  /**
   * Detect source tool from file extension and content
   */
  detectSourceTool(fileName, filePath) {
    const ext = path.extname(fileName).toLowerCase();
    
    const toolMapping = {
      '.spp': 'Plant Simulation',
      '.pss': 'Plant Simulation',
      '.sim': 'Generic Simulator',
      '.mdl': 'Process Simulator',
      '.xml': 'XML-based Tool',
      '.json': 'JSON-based Tool',
      '.fmu': 'FMI-compatible Tool',
      '.mat': 'MATLAB/Simulink',
      '.slx': 'Simulink'
    };

    return toolMapping[ext] || 'Unknown Tool';
  }

  /**
   * Extract interface definitions from model
   * Placeholder implementation - would parse actual file format
   */
  async extractInterfaces(filePath) {
    try {
      // Placeholder: Mock interfaces for demonstration
      // In production, parse actual model file format
      const interfaces = [
        {
          name: 'InputSignal',
          dataType: 'double',
          direction: 'input',
          unit: 'units/sec'
        },
        {
          name: 'OutputStatus',
          dataType: 'boolean',
          direction: 'output',
          unit: 'flag'
        },
        {
          name: 'ProcessData',
          dataType: 'struct',
          direction: 'inout',
          unit: 'mixed'
        }
      ];

      return interfaces;
    } catch (error) {
      return [];
    }
  }

  /**
   * Calculate compatibility percentages with different model types
   * Uses heuristic algorithms based on interfaces and model characteristics
   */
  calculateCompatibility(filePath, fileName) {
    // Placeholder algorithm - in production would analyze actual compatibility
    const baseCompatibility = Math.floor(Math.random() * 30) + 60; // 60-90%
    
    return {
      environmentModels: this.adjustCompatibility(baseCompatibility, 5),
      virtualECUs: this.adjustCompatibility(baseCompatibility, -10),
      plantModels: this.adjustCompatibility(baseCompatibility, 10)
    };
  }

  /**
   * Adjust compatibility score within valid range
   */
  adjustCompatibility(base, adjustment) {
    return Math.max(0, Math.min(100, base + adjustment));
  }

  /**
   * Get default metadata structure
   */
  getDefaultMetadata() {
    return {
      author: 'Unknown',
      modifiedDate: new Date().toISOString(),
      sourceTool: 'Unknown',
      interfaces: [],
      compatibility: {
        environmentModels: 0,
        virtualECUs: 0,
        plantModels: 0
      }
    };
  }

  /**
   * Update metadata for existing model
   */
  async updateMetadata(filePath, fileName, existingMetadata) {
    const newMetadata = await this.extractMetadata(filePath, fileName);
    
    return {
      ...existingMetadata,
      ...newMetadata,
      modifiedDate: new Date().toISOString()
    };
  }
}

module.exports = new MetadataExtractor();
