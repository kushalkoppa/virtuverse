import React, { useState } from 'react';

const paletteData = {
  medac: {
    title: 'MeDaC',
    icon: '📊',
    items: [
      { id: 'medac-1', name: 'Sensor Data Model', type: 'model' },
      { id: 'medac-2', name: 'Camera Data Processor', type: 'model' },
      { id: 'medac-3', name: 'LIDAR Data Handler', type: 'model' },
      { id: 'medac-4', name: 'Radar Data Parser', type: 'data' },
    ]
  },
  envihub: {
    title: 'EnviHub',
    icon: '🌍',
    items: [
      { id: 'envihub-1', name: 'Weather Model', type: 'model' },
      { id: 'envihub-2', name: 'Road Surface Model', type: 'model' },
      { id: 'envihub-3', name: 'Traffic Scenario', type: 'data' },
      { id: 'envihub-4', name: 'Terrain Model', type: 'model' },
    ]
  },
  planthub: {
    title: 'PlantHub',
    icon: '🏭',
    items: [
      { id: 'planthub-1', name: 'Powertrain Model', type: 'model' },
      { id: 'planthub-2', name: 'Battery Thermal Model', type: 'model' },
      { id: 'planthub-3', name: 'Vehicle Dynamics', type: 'model' },
      { id: 'planthub-4', name: 'Brake System Model', type: 'model' },
    ]
  },
  vehicledata: {
    title: 'VehicleData',
    icon: '🚗',
    items: [
      { id: 'vehicle-1', name: 'Vehicle Config A', type: 'data' },
      { id: 'vehicle-2', name: 'Vehicle Config B', type: 'data' },
      { id: 'vehicle-3', name: 'CAN Bus Data', type: 'data' },
      { id: 'vehicle-4', name: 'Calibration Data', type: 'data' },
    ]
  },
  middleware: {
    title: 'Co-Sim Middleware',
    icon: '🔗',
    items: [
      { id: 'mw-1', name: 'FMI/FMU Interface', type: 'middleware' },
      { id: 'mw-2', name: 'DCP Bridge', type: 'middleware' },
      { id: 'mw-3', name: 'SSP Connector', type: 'middleware' },
    ]
  },
  platforms: {
    title: 'Simulation Platforms',
    icon: '⚙️',
    items: [
      { id: 'platform-1', name: 'dSPACE VEOS', type: 'platform' },
      { id: 'platform-2', name: 'Synopsys SILVER', type: 'platform' },
      { id: 'platform-3', name: 'Vector CANoe', type: 'platform' },
      { id: 'platform-4', name: 'IPG CarMaker', type: 'platform' },
      { id: 'platform-5', name: 'MATLAB/Simulink', type: 'platform' },
    ]
  }
};

function Sidebar() {
  const [expandedSections, setExpandedSections] = useState({
    medac: true,
    envihub: true,
    planthub: true,
    vehicledata: true,
    middleware: true,
    platforms: true,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const onDragStart = (event, item, sectionKey) => {
    event.dataTransfer.setData('application/reactflow', item.type);
    event.dataTransfer.setData('label', item.name);
    event.dataTransfer.setData('nodeType', item.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Component Palette</h3>
      </div>
      
      <div className="sidebar-content">
        {Object.entries(paletteData).map(([key, section]) => (
          <div key={key} className="palette-section">
            <div 
              className="palette-section-header"
              onClick={() => toggleSection(key)}
            >
              <span className="section-icon">{section.icon}</span>
              <span className="section-title">{section.title}</span>
              <span className="section-toggle">
                {expandedSections[key] ? '▼' : '▶'}
              </span>
            </div>
            
            {expandedSections[key] && (
              <div className="palette-items">
                {section.items.map(item => (
                  <div
                    key={item.id}
                    className={`palette-item ${item.type}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, item, key)}
                  >
                    <span className="item-icon">
                      {item.type === 'model' ? '📦' : 
                       item.type === 'data' ? '📄' :
                       item.type === 'middleware' ? '🔗' :
                       item.type === 'platform' ? '⚙️' : '📦'}
                    </span>
                    <span className="item-name">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
