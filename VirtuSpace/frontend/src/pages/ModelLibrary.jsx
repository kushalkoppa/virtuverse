import { useState, useEffect } from 'react';
import { Search, Filter, Download, Share2, Edit, Trash2, Upload } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/ModelLibrary.css';

function ModelLibrary() {
  const location = useLocation();
  const isMeDaC = location.pathname.startsWith('/medac');
  
  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Simulate loading models from API
    const mockModels = isMeDaC ? [
      {
        id: 1,
        name: 'ADAS_Controller_ECU',
        type: 'Synopsys Virtualizer',
        version: 'v3.2',
        author: 'Bosch ADAS Team',
        size: '12.5 MB',
        modified: '2024-12-15',
        shared: true,
        tags: ['adas', 'controller', 'virtual-ecu']
      },
      {
        id: 2,
        name: 'Powertrain_Control_ECU',
        type: 'Vector CANoe',
        version: 'v2.8',
        author: 'Powertrain Team',
        size: '18.2 MB',
        modified: '2024-12-10',
        shared: false,
        tags: ['powertrain', 'control', 'ecu']
      },
      {
        id: 3,
        name: 'Battery_Management_ECU',
        type: 'dSPACE VEOS',
        version: 'v4.1',
        author: 'E-Mobility Team',
        size: '9.3 MB',
        modified: '2024-12-18',
        shared: true,
        tags: ['battery', 'bms', 'ev', 'virtual-ecu']
      },
      {
        id: 4,
        name: 'Gateway_ECU',
        type: 'ETAS LABCAR',
        version: 'v1.9',
        author: 'Network Team',
        size: '7.8 MB',
        modified: '2024-12-12',
        shared: false,
        tags: ['gateway', 'network', 'can']
      },
      {
        id: 5,
        name: 'Infotainment_ECU',
        type: 'Synopsys Virtualizer',
        version: 'v2.5',
        author: 'UX Team',
        size: '25.4 MB',
        modified: '2024-12-14',
        shared: true,
        tags: ['infotainment', 'hmi', 'virtual-ecu']
      }
    ] : [
      {
        id: 1,
        name: 'Vehicle_Dynamics_Model',
        type: 'IPG CarMaker',
        version: 'v2.1',
        author: 'Bosch Team A',
        size: '4.5 MB',
        modified: '2024-12-15',
        shared: true,
        tags: ['vehicle', 'dynamics', 'simulation']
      },
      {
        id: 2,
        name: 'Powertrain_System',
        type: 'Simulink',
        version: 'v1.8',
        author: 'OEM Partner',
        size: '8.2 MB',
        modified: '2024-12-10',
        shared: false,
        tags: ['powertrain', 'control']
      },
      {
        id: 3,
        name: 'Battery_Thermal_Model',
        type: 'MATLAB',
        version: 'v3.0',
        author: 'Supplier XYZ',
        size: '2.1 MB',
        modified: '2024-12-18',
        shared: true,
        tags: ['battery', 'thermal', 'ev']
      },
      {
        id: 4,
        name: 'ADAS_Sensor_Fusion',
        type: 'IPG CarMaker',
        version: 'v1.5',
        author: 'Bosch Team B',
        size: '6.7 MB',
        modified: '2024-12-12',
        shared: false,
        tags: ['adas', 'sensor', 'fusion']
      }
    ];
    setModels(mockModels);
  }, [isMeDaC]);

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || model.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{isMeDaC ? 'Virtual ECU Library' : 'Model Library'}</h2>
        <p>{isMeDaC ? 'Browse, manage, and share Virtual ECUs across your organization' : 'Browse, manage, and share simulation models across your organization'}</p>
      </div>

      <div className="library-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder={isMeDaC ? 'Search Virtual ECUs by name or tags...' : 'Search models by name or tags...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <Filter size={20} />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            {isMeDaC ? (
              <>
                <option value="Synopsys Virtualizer">Synopsys Virtualizer</option>
                <option value="Vector CANoe">Vector CANoe</option>
                <option value="dSPACE VEOS">dSPACE VEOS</option>
                <option value="ETAS LABCAR">ETAS LABCAR</option>
              </>
            ) : (
              <>
                <option value="IPG CarMaker">IPG CarMaker</option>
                <option value="Simulink">Simulink</option>
                <option value="MATLAB">MATLAB</option>
              </>
            )}
          </select>
        </div>

        <button className="upload-btn">
          <Upload size={20} />
          <span>{isMeDaC ? 'Create Virtual ECU' : 'Upload Model'}</span>
        </button>
      </div>

      <div className="models-grid">
        {filteredModels.map(model => (
          <div key={model.id} className="model-card">
            <div className="model-header">
              <h3>{model.name}</h3>
              {model.shared && <span className="shared-badge">Shared</span>}
            </div>
            <div className="model-info">
              <p><strong>Type:</strong> {model.type}</p>
              <p><strong>Version:</strong> {model.version}</p>
              <p><strong>Author:</strong> {model.author}</p>
              <p><strong>Size:</strong> {model.size}</p>
              <p><strong>Modified:</strong> {model.modified}</p>
            </div>
            <div className="model-tags">
              {model.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="model-actions">
              <button className="action-icon" title="Download">
                <Download size={18} />
              </button>
              <button className="action-icon" title="Share">
                <Share2 size={18} />
              </button>
              <button className="action-icon" title="Edit">
                <Edit size={18} />
              </button>
              <button className="action-icon delete" title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="no-results">
          <p>{isMeDaC ? 'No Virtual ECUs found matching your search criteria.' : 'No models found matching your search criteria.'}</p>
        </div>
      )}
    </div>
  );
}

export default ModelLibrary;
