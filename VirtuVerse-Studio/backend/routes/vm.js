const express = require('express');
const router = express.Router();
const { Client } = require('ssh2');
const { authMiddleware } = require('../middleware/auth');

// Get VM connection status
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const vmConfig = {
      host: process.env.VM_SSH_HOST,
      port: process.env.VM_SSH_PORT || 22,
      username: process.env.VM_SSH_USER,
    };

    res.json({
      status: 'configured',
      host: vmConfig.host,
      port: vmConfig.port,
      username: vmConfig.username,
      toolsPath: process.env.VM_TOOLS_PATH || '/opt/virtuverse/tools'
    });
  } catch (error) {
    console.error('VM status error:', error);
    res.status(500).json({ error: 'Failed to get VM status' });
  }
});

// Test VM connection
router.post('/test', authMiddleware, async (req, res) => {
  const conn = new Client();
  
  try {
    const connected = await new Promise((resolve, reject) => {
      conn.on('ready', () => {
        resolve(true);
      }).on('error', (err) => {
        reject(err);
      }).connect({
        host: process.env.VM_SSH_HOST,
        port: process.env.VM_SSH_PORT || 22,
        username: process.env.VM_SSH_USER,
        privateKey: process.env.VM_SSH_PRIVATE_KEY_PATH ? 
          require('fs').readFileSync(process.env.VM_SSH_PRIVATE_KEY_PATH) : undefined,
        password: process.env.VM_SSH_PASSWORD
      });

      // Set timeout
      setTimeout(() => reject(new Error('Connection timeout')), 10000);
    });

    conn.end();
    res.json({ status: 'success', message: 'VM connection successful' });
  } catch (error) {
    console.error('VM connection test failed:', error);
    res.status(500).json({ 
      status: 'failed', 
      message: 'VM connection failed',
      error: error.message 
    });
  }
});

// Execute command on VM
router.post('/execute', authMiddleware, async (req, res) => {
  const { command } = req.body;
  
  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  const conn = new Client();
  
  try {
    const result = await new Promise((resolve, reject) => {
      conn.on('ready', () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            reject(err);
            return;
          }

          let stdout = '';
          let stderr = '';

          stream.on('close', (code, signal) => {
            conn.end();
            resolve({ stdout, stderr, code, signal });
          }).on('data', (data) => {
            stdout += data.toString();
          }).stderr.on('data', (data) => {
            stderr += data.toString();
          });
        });
      }).on('error', (err) => {
        reject(err);
      }).connect({
        host: process.env.VM_SSH_HOST,
        port: process.env.VM_SSH_PORT || 22,
        username: process.env.VM_SSH_USER,
        privateKey: process.env.VM_SSH_PRIVATE_KEY_PATH ? 
          require('fs').readFileSync(process.env.VM_SSH_PRIVATE_KEY_PATH) : undefined,
        password: process.env.VM_SSH_PASSWORD
      });

      setTimeout(() => reject(new Error('Command execution timeout')), 30000);
    });

    res.json({ 
      status: 'success', 
      result: {
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.code
      }
    });
  } catch (error) {
    console.error('VM command execution failed:', error);
    res.status(500).json({ 
      status: 'failed', 
      message: 'Command execution failed',
      error: error.message 
    });
  }
});

// List available tools on VM
router.get('/tools', authMiddleware, async (req, res) => {
  const conn = new Client();
  const toolsPath = process.env.VM_TOOLS_PATH || '/opt/virtuverse/tools';
  
  try {
    const result = await new Promise((resolve, reject) => {
      conn.on('ready', () => {
        conn.exec(`ls -la ${toolsPath}`, (err, stream) => {
          if (err) {
            reject(err);
            return;
          }

          let stdout = '';
          
          stream.on('close', (code) => {
            conn.end();
            resolve({ stdout, code });
          }).on('data', (data) => {
            stdout += data.toString();
          });
        });
      }).on('error', (err) => {
        reject(err);
      }).connect({
        host: process.env.VM_SSH_HOST,
        port: process.env.VM_SSH_PORT || 22,
        username: process.env.VM_SSH_USER,
        privateKey: process.env.VM_SSH_PRIVATE_KEY_PATH ? 
          require('fs').readFileSync(process.env.VM_SSH_PRIVATE_KEY_PATH) : undefined,
        password: process.env.VM_SSH_PASSWORD
      });

      setTimeout(() => reject(new Error('Timeout listing tools')), 10000);
    });

    res.json({ 
      status: 'success',
      toolsPath,
      tools: result.stdout
    });
  } catch (error) {
    console.error('Failed to list VM tools:', error);
    res.status(500).json({ 
      status: 'failed', 
      message: 'Failed to list tools',
      error: error.message 
    });
  }
});

module.exports = router;
