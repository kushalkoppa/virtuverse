import { useState } from 'react';
import { Save, RefreshCw, Code, Eye, Share2 } from 'lucide-react';
import '../styles/ModelEditor.css';

function ModelEditor() {
  const [selectedModel, setSelectedModel] = useState('');
  const [editorMode, setEditorMode] = useState('visual');
  const [modelData, setModelData] = useState({
    name: 'Vehicle_Dynamics_Model',
    description: 'Advanced vehicle dynamics simulation model',
    parameters: {
      mass: 1500,
      wheelbase: 2.7,
      cogHeight: 0.5
    }
  });

  const availableModels = [
    { id: 1, name: 'Vehicle_Dynamics_Model', tool: 'IPG CarMaker' },
    { id: 2, name: 'Powertrain_System', tool: 'Simulink' },
    { id: 3, name: 'Battery_Thermal_Model', tool: 'MATLAB' }
  ];

  const handleModelSelect = (e) => {
    const modelName = e.target.value;
    setSelectedModel(modelName);
    // In real app, this would fetch model data from backend
  };

  const handleSave = () => {
    alert('Model saved successfully! In production, this would save to backend.');
  };

  const handleShare = () => {
    alert('Share dialog would open here with options to share with OEMs, suppliers, or internal teams.');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Model Editor</h2>
        <p>Edit and configure simulation models across different tools</p>
      </div>

      <div className="editor-controls">
        <div className="control-group">
          <label>Select Model:</label>
          <select value={selectedModel} onChange={handleModelSelect}>
            <option value="">Choose a model...</option>
            {availableModels.map(model => (
              <option key={model.id} value={model.name}>
                {model.name} ({model.tool})
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Editor Mode:</label>
          <div className="mode-toggle">
            <button
              className={editorMode === 'visual' ? 'active' : ''}
              onClick={() => setEditorMode('visual')}
            >
              <Eye size={18} />
              Visual
            </button>
            <button
              className={editorMode === 'code' ? 'active' : ''}
              onClick={() => setEditorMode('code')}
            >
              <Code size={18} />
              Code
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-save" onClick={handleSave}>
            <Save size={18} />
            Save
          </button>
          <button className="btn-share" onClick={handleShare}>
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      <div className="editor-workspace">
        {selectedModel ? (
          <>
            {editorMode === 'visual' ? (
              <div className="visual-editor">
                <div className="editor-section">
                  <h3>Model Information</h3>
                  <div className="form-group">
                    <label>Model Name:</label>
                    <input
                      type="text"
                      value={modelData.name}
                      onChange={(e) => setModelData({...modelData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      value={modelData.description}
                      onChange={(e) => setModelData({...modelData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="editor-section">
                  <h3>Model Parameters</h3>
                  <div className="parameters-grid">
                    <div className="param-item">
                      <label>Vehicle Mass (kg):</label>
                      <input
                        type="number"
                        value={modelData.parameters.mass}
                        onChange={(e) => setModelData({
                          ...modelData,
                          parameters: {...modelData.parameters, mass: parseFloat(e.target.value)}
                        })}
                      />
                    </div>
                    <div className="param-item">
                      <label>Wheelbase (m):</label>
                      <input
                        type="number"
                        step="0.1"
                        value={modelData.parameters.wheelbase}
                        onChange={(e) => setModelData({
                          ...modelData,
                          parameters: {...modelData.parameters, wheelbase: parseFloat(e.target.value)}
                        })}
                      />
                    </div>
                    <div className="param-item">
                      <label>CoG Height (m):</label>
                      <input
                        type="number"
                        step="0.1"
                        value={modelData.parameters.cogHeight}
                        onChange={(e) => setModelData({
                          ...modelData,
                          parameters: {...modelData.parameters, cogHeight: parseFloat(e.target.value)}
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="editor-section">
                  <h3>Tool Integration Settings</h3>
                  <div className="integration-settings">
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" defaultChecked />
                        Enable IPG CarMaker integration
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" defaultChecked />
                        Enable MATLAB/Simulink export
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" />
                        Enable dSPACE VEOS compatibility
                      </label>
                    </div>
                  </div>
                </div>

                <div className="editor-section">
                  <h3>Sharing Options</h3>
                  <div className="sharing-options">
                    <div className="option-item">
                      <label>
                        <input type="checkbox" />
                        Share with external OEMs
                      </label>
                    </div>
                    <div className="option-item">
                      <label>
                        <input type="checkbox" />
                        Share with suppliers
                      </label>
                    </div>
                    <div className="option-item">
                      <label>
                        <input type="checkbox" defaultChecked />
                        Internal use only (Bosch domains)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="code-editor">
                <pre className="code-view">
{`{
  "name": "${modelData.name}",
  "description": "${modelData.description}",
  "type": "vehicle_dynamics",
  "tool": "IPG CarMaker",
  "version": "2.1",
  "parameters": {
    "mass": ${modelData.parameters.mass},
    "wheelbase": ${modelData.parameters.wheelbase},
    "cogHeight": ${modelData.parameters.cogHeight}
  },
  "interfaces": {
    "inputs": ["steering_angle", "throttle", "brake"],
    "outputs": ["velocity", "acceleration", "position"]
  },
  "metadata": {
    "author": "Bosch Team",
    "created": "2024-12-15",
    "modified": "2024-12-19"
  }
}`}
                </pre>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <RefreshCw size={64} className="empty-icon" />
            <h3>No Model Selected</h3>
            <p>Please select a model from the dropdown above to start editing</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelEditor;
