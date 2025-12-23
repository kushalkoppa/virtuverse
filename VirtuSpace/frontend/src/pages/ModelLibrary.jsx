import { useState, useEffect } from 'react';
import { Search, Filter, Download, Share2, Edit, Trash2, Upload } from 'lucide-react';
import '../styles/ModelLibrary.css';

function ModelLibrary() {
  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Simulate loading models from API
    const mockModels = [
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
  }, []);

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || model.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Model Library</h2>
        <p>Browse, manage, and share simulation models across your organization</p>
      </div>

      <div className="library-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search models by name or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <Filter size={20} />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="IPG CarMaker">IPG CarMaker</option>
            <option value="Simulink">Simulink</option>
            <option value="MATLAB">MATLAB</option>
          </select>
        </div>

        <button className="upload-btn">
          <Upload size={20} />
          <span>Upload Model</span>
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
          <p>No models found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default ModelLibrary;
