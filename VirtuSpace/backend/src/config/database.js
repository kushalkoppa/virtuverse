const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../envihub.db');
const db = new sqlite3.Database(dbPath);

const initialize = () => {
  db.serialize(() => {
    // Create models table
    db.run(`
      CREATE TABLE IF NOT EXISTS models (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        version TEXT,
        author TEXT,
        size TEXT,
        file_path TEXT,
        shared BOOLEAN DEFAULT 0,
        tags TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tool_integrations table
    db.run(`
      CREATE TABLE IF NOT EXISTS tool_integrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        version TEXT,
        endpoint TEXT,
        status TEXT DEFAULT 'disconnected',
        last_sync DATETIME,
        api_key TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create metadata table
    db.run(`
      CREATE TABLE IF NOT EXISTS metadata (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        model_id INTEGER,
        metadata_json TEXT,
        extracted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (model_id) REFERENCES models(id)
      )
    `);

    // Insert sample data
    db.get("SELECT COUNT(*) as count FROM models", (err, row) => {
      if (!err && row.count === 0) {
        const sampleModels = [
          ['Vehicle_Dynamics_Model', 'IPG CarMaker', 'v2.1', 'Bosch Team A', '4.5 MB', null, 1, 'vehicle,dynamics,simulation', 'Advanced vehicle dynamics simulation model'],
          ['Powertrain_System', 'Simulink', 'v1.8', 'OEM Partner', '8.2 MB', null, 0, 'powertrain,control', 'Powertrain control system model'],
          ['Battery_Thermal_Model', 'MATLAB', 'v3.0', 'Supplier XYZ', '2.1 MB', null, 1, 'battery,thermal,ev', 'Battery thermal management model'],
          ['ADAS_Sensor_Fusion', 'IPG CarMaker', 'v1.5', 'Bosch Team B', '6.7 MB', null, 0, 'adas,sensor,fusion', 'ADAS sensor fusion algorithm']
        ];

        const stmt = db.prepare("INSERT INTO models (name, type, version, author, size, file_path, shared, tags, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        sampleModels.forEach(model => stmt.run(model));
        stmt.finalize();
      }
    });

    db.get("SELECT COUNT(*) as count FROM tool_integrations", (err, row) => {
      if (!err && row.count === 0) {
        const sampleTools = [
          ['IPG CarMaker', '12.0', 'http://localhost:8080', 'connected', new Date().toISOString(), null, 'Industry-leading virtual test driving simulation'],
          ['MATLAB/Simulink', 'R2024a', 'http://localhost:9090', 'connected', new Date().toISOString(), null, 'Model-based design and simulation environment'],
          ['dSPACE VEOS', '5.2', 'http://localhost:7070', 'disconnected', new Date(Date.now() - 86400000).toISOString(), null, 'PC-based simulation platform']
        ];

        const stmt = db.prepare("INSERT INTO tool_integrations (name, version, endpoint, status, last_sync, api_key, description) VALUES (?, ?, ?, ?, ?, ?, ?)");
        sampleTools.forEach(tool => stmt.run(tool));
        stmt.finalize();
      }
    });

    console.log('Database initialized successfully');
  });
};

module.exports = { db, initialize };
