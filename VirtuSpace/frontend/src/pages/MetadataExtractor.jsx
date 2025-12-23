import { useState } from 'react';
import { FileCode, Upload, Download, CheckCircle } from 'lucide-react';
import '../styles/MetadataExtractor.css';

function MetadataExtractor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedMetadata, setExtractedMetadata] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setExtractedMetadata(null);
    }
  };

  const handleExtract = () => {
    if (!selectedFile) return;

    setIsExtracting(true);
    
    // Simulate metadata extraction
    setTimeout(() => {
      const mockMetadata = {
        basic: {
          fileName: selectedFile.name,
          fileSize: `${(selectedFile.size / 1024).toFixed(2)} KB`,
          fileType: selectedFile.type || 'application/octet-stream',
          lastModified: new Date(selectedFile.lastModified).toLocaleString()
        },
        simulation: {
          toolVersion: 'IPG CarMaker 12.0',
          modelType: 'Vehicle Dynamics',
          simulationTime: '100.0 seconds',
          stepSize: '0.001 seconds'
        },
        parameters: {
          vehicleMass: '1500 kg',
          wheelbase: '2.7 m',
          trackWidth: '1.5 m',
          cogHeight: '0.5 m'
        },
        interfaces: {
          inputs: ['Steering Angle', 'Throttle Position', 'Brake Pressure'],
          outputs: ['Vehicle Speed', 'Lateral Acceleration', 'Yaw Rate', 'Position X/Y'],
          protocol: 'FMI 2.0'
        },
        smartHarness: {
          compatibleTools: ['MATLAB/Simulink', 'dSPACE VEOS', 'CarMaker'],
          integrationPoints: 4,
          cosimReady: true,
          fmuExport: true
        }
      };
      
      setExtractedMetadata(mockMetadata);
      setIsExtracting(false);
    }, 2000);
  };

  const handleExport = () => {
    if (!extractedMetadata) return;
    
    const dataStr = JSON.stringify(extractedMetadata, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedFile.name}_metadata.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Metadata Extractor</h2>
        <p>Extract smart harness metadata from simulation models for cosimulation integration</p>
      </div>

      <div className="extractor-content">
        <div className="upload-section">
          <div className="upload-area">
            <FileCode size={48} className="upload-icon" />
            <h3>Select Model File</h3>
            <p>Choose a simulation model file to extract metadata</p>
            <input
              type="file"
              id="file-input"
              className="file-input"
              onChange={handleFileSelect}
              accept=".ipg,.slx,.mat,.fmu,.xml"
            />
            <label htmlFor="file-input" className="file-label">
              <Upload size={20} />
              Choose File
            </label>
            {selectedFile && (
              <div className="selected-file">
                <CheckCircle size={20} className="check-icon" />
                <span>{selectedFile.name}</span>
              </div>
            )}
          </div>

          <button
            className="extract-btn"
            onClick={handleExtract}
            disabled={!selectedFile || isExtracting}
          >
            {isExtracting ? 'Extracting...' : 'Extract Metadata'}
          </button>
        </div>

        {extractedMetadata && (
          <div className="metadata-results">
            <div className="results-header">
              <h3>Extracted Metadata</h3>
              <button className="export-btn" onClick={handleExport}>
                <Download size={18} />
                Export JSON
              </button>
            </div>

            <div className="metadata-sections">
              <div className="metadata-section">
                <h4>Basic Information</h4>
                <div className="metadata-grid">
                  {Object.entries(extractedMetadata.basic).map(([key, value]) => (
                    <div key={key} className="metadata-item">
                      <span className="metadata-key">{key}:</span>
                      <span className="metadata-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="metadata-section">
                <h4>Simulation Configuration</h4>
                <div className="metadata-grid">
                  {Object.entries(extractedMetadata.simulation).map(([key, value]) => (
                    <div key={key} className="metadata-item">
                      <span className="metadata-key">{key}:</span>
                      <span className="metadata-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="metadata-section">
                <h4>Model Parameters</h4>
                <div className="metadata-grid">
                  {Object.entries(extractedMetadata.parameters).map(([key, value]) => (
                    <div key={key} className="metadata-item">
                      <span className="metadata-key">{key}:</span>
                      <span className="metadata-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="metadata-section">
                <h4>Interface Definitions</h4>
                <div className="metadata-grid">
                  <div className="metadata-item">
                    <span className="metadata-key">inputs:</span>
                    <span className="metadata-value">{extractedMetadata.interfaces.inputs.join(', ')}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-key">outputs:</span>
                    <span className="metadata-value">{extractedMetadata.interfaces.outputs.join(', ')}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-key">protocol:</span>
                    <span className="metadata-value">{extractedMetadata.interfaces.protocol}</span>
                  </div>
                </div>
              </div>

              <div className="metadata-section highlight">
                <h4>Smart Harness Information</h4>
                <div className="metadata-grid">
                  <div className="metadata-item">
                    <span className="metadata-key">compatibleTools:</span>
                    <span className="metadata-value">{extractedMetadata.smartHarness.compatibleTools.join(', ')}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-key">integrationPoints:</span>
                    <span className="metadata-value">{extractedMetadata.smartHarness.integrationPoints}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-key">cosimReady:</span>
                    <span className="metadata-value">{extractedMetadata.smartHarness.cosimReady ? '✓ Yes' : '✗ No'}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-key">fmuExport:</span>
                    <span className="metadata-value">{extractedMetadata.smartHarness.fmuExport ? '✓ Supported' : '✗ Not Supported'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MetadataExtractor;
