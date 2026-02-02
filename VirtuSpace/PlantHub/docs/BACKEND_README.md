# Plant Model Management Backend

A comprehensive Node.js backend for managing plant simulation models with metadata extraction, versioning, and tool integration capabilities.

## Features

### ✅ Plant Model Management
- **Unique ID Assignment**: Automatic generation of unique identifiers for each model
- **Model Storage**: Accept and store plant models as placeholders
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **File Upload**: Support for model file uploads with automatic processing

### ✅ Metadata Extraction
Automatically extracts the following metadata upon model upload:
- **Author**: Extracted from file or system default
- **Modified Date**: File modification timestamp
- **Source Tool**: Auto-detected from file extension
  - Plant Simulation (`.spp`, `.pss`)
  - Process Simulator (`.mdl`, `.sim`)
  - MATLAB/Simulink (`.mat`, `.slx`)
  - FMI Tools (`.fmu`)
  - Generic tools (`.xml`, `.json`)
- **Interface Names and Data Types**: Extracted interface definitions including:
  - Interface name
  - Data type (double, integer, boolean, struct, etc.)
  - Direction (input, output, inout)
  - Unit of measurement
- **Compatibility Percentages**: Calculated compatibility with:
  - Environment models (0-100%)
  - Virtual ECUs (0-100%)
  - Other plant models (0-100%)

### ✅ Versioning System
- **Semantic Versioning**: Uses Major.Minor.Patch format
- **Automatic Version Increment**: Updates increment patch version automatically
- **Version History**: Complete history of all versions with timestamps
- **Change Tracking**: Each version records what changed
- **Parent Version Tracking**: Maintains lineage of model versions

### ✅ Tool Integration
- **Open in External Tools**: Launch models in registered external tools
- **Save from Tools**: Save edited models back as new versions
- **Tool Registry**: Support for multiple tools including:
  - Plant Simulation
  - Process Simulator
  - MATLAB/Simulink
- **Session Management**: Track tool editing sessions

## Architecture

```
backend/
├── models/
│   └── PlantModel.js          # Plant model data structure
├── services/
│   ├── metadataExtractor.js   # Metadata extraction service
│   └── toolIntegration.js     # Tool integration service
├── utils/
│   └── idGenerator.js         # Unique ID generation
├── routes/
│   ├── plantModelRoutes.js    # Plant model API routes
│   ├── plantToolRoutes.js     # Tool management routes
│   └── plantSharingRoutes.js  # Sharing functionality routes
├── uploads/                   # File upload storage
└── server.js                  # Express server
```

## Installation

1. Navigate to the PlantHub directory:
```bash
cd VirtuSpace/PlantHub
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=3002
PLANT_SIM_PATH=/path/to/plantsim
PROCESS_SIM_PATH=/path/to/procsim
MATLAB_PATH=/path/to/matlab
DEFAULT_AUTHOR=System
```

## Usage

### Start the Server

Development mode with auto-reload:
```bash
npm run dev:backend
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3002`

### Run Tests

```bash
npm test
```

All 19 tests should pass:
- ✅ Plant Model Management API endpoints
- ✅ PlantModel class functionality
- ✅ Metadata extraction service
- ✅ Tool integration service
- ✅ ID generator utility

## API Endpoints

See [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) for complete API reference.

### Quick Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/plant-models` | GET | Get all plant models |
| `/api/plant-models/:id` | GET | Get specific model |
| `/api/plant-models/:id/metadata` | GET | Get model metadata |
| `/api/plant-models/:id/versions` | GET | Get version history |
| `/api/plant-models` | POST | Create new model |
| `/api/plant-models/:id` | PUT | Update model (creates version) |
| `/api/plant-models/:id` | DELETE | Delete model |
| `/api/plant-models/:id/open-tool` | POST | Open in external tool |
| `/api/plant-models/:id/save-from-tool` | POST | Save edited model |
| `/api/plant-models/tools/available` | GET | Get available tools |

## Example Usage

### Create a Model with File Upload

```bash
curl -X POST http://localhost:3002/api/plant-models \
  -F "name=Assembly Line Model" \
  -F "description=Complete assembly line simulation" \
  -F "type=Plant Simulation" \
  -F "modelFile=@model.spp"
```

### Update Model (Creates New Version)

```bash
curl -X PUT http://localhost:3002/api/plant-models/PM-XXX-YYY \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated assembly line model",
    "changeDescription": "Optimized conveyor speed logic"
  }'
```

### Get Model Metadata

```bash
curl http://localhost:3002/api/plant-models/PM-XXX-YYY/metadata
```

### Open Model in External Tool

```bash
curl -X POST http://localhost:3002/api/plant-models/PM-XXX-YYY/open-tool \
  -H "Content-Type: application/json" \
  -d '{"toolName": "Plant Simulation"}'
```

### Save Edited Model

```bash
curl -X POST http://localhost:3002/api/plant-models/PM-XXX-YYY/save-from-tool \
  -F "editedFile=@edited_model.spp" \
  -F "changeDescription=Fixed interface parameters"
```

## Technical Details

### PlantModel Class
- Encapsulates all model data and metadata
- Provides versioning methods
- Converts to/from JSON

### Metadata Extractor Service
- Analyzes uploaded files
- Extracts metadata based on file type
- Calculates compatibility percentages
- Extensible for new file formats

### Tool Integration Service
- Manages external tool registry
- Generates tool launch commands
- Tracks editing sessions
- Handles file transfers

### ID Generator Utility
- Generates unique numeric IDs
- Creates UUID-style identifiers
- Prefixed model IDs (PM-XXX-YYY)
- Version-specific IDs

## File Upload Support

Supported file types:
- `.spp`, `.pss` - Plant Simulation
- `.mdl`, `.sim` - Process Simulator
- `.mat`, `.slx` - MATLAB/Simulink
- `.fmu` - FMI-compatible tools
- `.xml`, `.json` - Generic formats

Maximum file size: 100 MB

## Data Storage

**Current Implementation**: In-memory storage (placeholder)
- Models stored in JavaScript array
- Lost on server restart
- Suitable for development and testing

**Production Recommendation**: Use database
- MongoDB for document-based storage
- PostgreSQL for relational data
- File system or object storage for model files

## Compatibility Algorithm

The compatibility calculation uses heuristic algorithms based on:
- File type and format
- Interface definitions
- Data types and directions
- Tool compatibility matrices

Base compatibility is calculated per model type:
- Environment Models: Base ± variance
- Virtual ECUs: Base ± variance
- Plant Models: Base ± variance

## Security Considerations

- File upload validation by extension
- File size limits enforced (100 MB)
- Path traversal protection
- Input sanitization on all endpoints

**Production Recommendations**:
- Add authentication and authorization
- Implement rate limiting
- Add virus scanning for uploaded files
- Use signed URLs for file access
- Encrypt sensitive metadata

## Performance

- Efficient in-memory operations
- Parallel file processing support
- Streaming for large file uploads
- Minimal metadata extraction overhead

**Production Optimizations**:
- Database indexing on model IDs
- Caching for frequently accessed models
- Background job processing for large files
- CDN for model file distribution

## Testing

Test suite includes:
- API endpoint tests (7 tests)
- PlantModel class tests (3 tests)
- Metadata extractor tests (3 tests)
- Tool integration tests (3 tests)
- ID generator tests (3 tests)

**Total: 19 tests, all passing ✅**

## Future Enhancements

1. **Database Integration**
   - MongoDB or PostgreSQL
   - Persistent storage
   - Transaction support

2. **Advanced Metadata Extraction**
   - Parse actual file formats
   - Extract more detailed information
   - Custom metadata fields

3. **Enhanced Compatibility**
   - Machine learning-based compatibility
   - Real compatibility testing
   - Compatibility matrix visualization

4. **Tool Integration**
   - Execute actual tool commands
   - Real-time tool session monitoring
   - Collaborative editing support

5. **User Management**
   - Authentication and authorization
   - User-specific models
   - Permission-based access

6. **Search and Filtering**
   - Full-text search
   - Advanced filtering
   - Tag-based organization

7. **Analytics**
   - Usage statistics
   - Popular models tracking
   - Performance metrics

## Troubleshooting

### Server won't start
- Check if port 3002 is available
- Verify Node.js version (14+ required)
- Check for missing dependencies: `npm install`

### File upload fails
- Check file size (max 100 MB)
- Verify file extension is supported
- Check uploads directory permissions

### Tests fail
- Run `npm install` to ensure all dependencies
- Check Node.js version compatibility
- Verify no other process on port 3002

## Contributing

When contributing to this backend:
1. Follow existing code structure
2. Add tests for new features
3. Update API documentation
4. Maintain backward compatibility
5. Use semantic versioning

## License

ISC

## Support

For issues and questions:
- Check API documentation
- Review test examples
- Open an issue in the repository
