# VirtuVerse Python Dependencies

This directory contains Python-based utilities and tools for the VirtuVerse platform.

## Installation

### Using Poetry (Recommended)

Poetry is the recommended way to manage Python dependencies for this project.

1. **Install Poetry** (if not already installed):
   ```bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

2. **Install dependencies**:
   ```bash
   poetry install
   ```

3. **Install with optional dependencies**:
   ```bash
   # Install with web framework support
   poetry install --extras web
   
   # Install with database support
   poetry install --extras db
   
   # Install with testing tools
   poetry install --extras test
   
   # Install with data processing tools
   poetry install --extras data
   
   # Install everything
   poetry install --extras all
   ```

4. **Activate the virtual environment**:
   ```bash
   poetry shell
   ```

### Using pip

Alternatively, you can use pip to install dependencies:

```bash
# Generate requirements.txt from pyproject.toml
poetry export -f requirements.txt --output requirements.txt --without-hashes

# Install using pip
pip install -r requirements.txt
```

## Available Extras

The following optional dependency groups are available:

- **web**: Flask, FastAPI, and Uvicorn for web services
- **db**: SQLAlchemy and PostgreSQL support for database operations
- **test**: pytest and coverage tools for testing
- **data**: pandas and numpy for data processing
- **all**: All optional dependencies

## Development

### Setting up development environment

```bash
# Install with development dependencies
poetry install --with dev

# Run tests
poetry run pytest

# Format code with Black
poetry run black virtuverse/

# Lint code with flake8
poetry run flake8 virtuverse/

# Type check with mypy
poetry run mypy virtuverse/
```

### Adding new dependencies

```bash
# Add a runtime dependency
poetry add package-name

# Add a development dependency
poetry add --group dev package-name

# Add an optional dependency
poetry add --optional package-name
```

## Package Structure

```
virtuverse/
├── pyproject.toml          # Poetry configuration and dependencies
├── virtuverse/             # Python package directory
│   └── __init__.py        # Package initialization
└── tests/                  # Test directory (to be created)
```

## Integration with Node.js Services

This Python package is designed to complement the Node.js-based services in VirtuVerse. It can be used for:

- Data processing and analysis
- Machine learning model serving
- Backend utilities and tools
- Integration with Python-based simulation tools
- API clients for external services

## Documentation

For more information about the VirtuVerse platform, see:
- [Main README](../README.md)
- [Getting Started Guide](../GETTING_STARTED.md)
- [Deployment Guide](../DEPLOYMENT.md)
