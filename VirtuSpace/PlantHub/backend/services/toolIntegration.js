/**
 * ToolIntegration - Service for integrating with external plant simulation tools
 * Handles opening models in external tools and saving them back
 */

const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs').promises;

const execPromise = util.promisify(exec);

class ToolIntegration {
  constructor() {
    // Map of tool names to their executable paths and commands
    this.toolRegistry = {
      'Plant Simulation': {
        executable: process.env.PLANT_SIM_PATH || 'plantsim',
        openCommand: (filePath) => `"${this.toolRegistry['Plant Simulation'].executable}" "${filePath}"`,
        fileExtensions: ['.spp', '.pss']
      },
      'Process Simulator': {
        executable: process.env.PROCESS_SIM_PATH || 'procsim',
        openCommand: (filePath) => `"${this.toolRegistry['Process Simulator'].executable}" "${filePath}"`,
        fileExtensions: ['.mdl', '.sim']
      },
      'MATLAB/Simulink': {
        executable: process.env.MATLAB_PATH || 'matlab',
        openCommand: (filePath) => `"${this.toolRegistry['MATLAB/Simulink'].executable}" -r "open('${filePath}')"`,
        fileExtensions: ['.mat', '.slx']
      }
    };
  }

  /**
   * Open a plant model in its associated external tool
   */
  async openInTool(modelFilePath, toolName) {
    try {
      const tool = this.toolRegistry[toolName];
      
      if (!tool) {
        throw new Error(`Tool "${toolName}" is not registered`);
      }

      // Verify file exists
      await fs.access(modelFilePath);

      // Get the command to open the tool
      const command = tool.openCommand(modelFilePath);

      // Return session information (in production, this would track the tool session)
      return {
        success: true,
        sessionId: this.generateSessionId(),
        toolName: toolName,
        filePath: modelFilePath,
        message: `Model opened in ${toolName}`,
        // In production environment, execute: await execPromise(command);
        commandPreview: command
      };
    } catch (error) {
      throw new Error(`Failed to open model in tool: ${error.message}`);
    }
  }

  /**
   * Save an edited model back from external tool
   */
  async saveFromTool(sessionId, newFilePath, originalModelId) {
    try {
      // Verify the new file exists
      await fs.access(newFilePath);

      // Get file stats
      const stats = await fs.stat(newFilePath);

      return {
        success: true,
        sessionId: sessionId,
        filePath: newFilePath,
        fileSize: stats.size,
        modifiedDate: stats.mtime.toISOString(),
        originalModelId: originalModelId,
        message: 'Model saved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to save model from tool: ${error.message}`);
    }
  }

  /**
   * Get tool information by name
   */
  getToolInfo(toolName) {
    const tool = this.toolRegistry[toolName];
    if (!tool) {
      return null;
    }

    return {
      name: toolName,
      executable: tool.executable,
      supportedExtensions: tool.fileExtensions
    };
  }

  /**
   * Get all registered tools
   */
  getAllTools() {
    return Object.keys(this.toolRegistry).map(toolName => ({
      name: toolName,
      executable: this.toolRegistry[toolName].executable,
      supportedExtensions: this.toolRegistry[toolName].fileExtensions
    }));
  }

  /**
   * Detect appropriate tool for a file based on extension
   */
  detectToolForFile(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    
    for (const [toolName, tool] of Object.entries(this.toolRegistry)) {
      if (tool.fileExtensions.includes(ext)) {
        return toolName;
      }
    }

    return null;
  }

  /**
   * Generate a unique session ID for tool sessions
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate if a tool session is active
   * Placeholder - in production would track actual tool processes
   */
  async isSessionActive(sessionId) {
    // Placeholder implementation
    return {
      active: true,
      sessionId: sessionId,
      message: 'Session validation not implemented in placeholder mode'
    };
  }

  /**
   * Close a tool session
   * Placeholder - in production would close actual tool processes
   */
  async closeSession(sessionId) {
    return {
      success: true,
      sessionId: sessionId,
      message: 'Session closed'
    };
  }
}

module.exports = new ToolIntegration();
