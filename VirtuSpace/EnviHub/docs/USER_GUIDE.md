# EnviHub User Guide

## Introduction

EnviHub is a unified platform for managing virtualization and simulation tools within VirtuSpace. This guide will help you get started with using EnviHub effectively.

## Getting Started

### Accessing EnviHub

1. Open your web browser
2. Navigate to `http://localhost:3000` (or your configured URL)
3. You will see the EnviHub dashboard

### Dashboard Overview

The dashboard provides a quick overview of:
- Connected simulation tools
- Available models in the library
- Models currently being edited
- Active sharing records

## Features

### 1. Tool Interfaces

The Tool Interfaces page allows you to connect to and manage various simulation tools.

**Supported Tools:**
- **IPG CarMaker**: Vehicle dynamics simulation
- **MATLAB Simulink**: Model-based design and simulation
- **PreScan**: Sensor and scenario simulation

**How to Connect to a Tool:**
1. Navigate to "Tool Interfaces" from the navigation menu
2. Find the tool you want to connect to
3. Click the "Connect" button
4. The status will change to "connected"

**How to Disconnect:**
1. Find the connected tool
2. Click the "Disconnect" button

### 2. Model Library

The Model Library is your central repository for all simulation models.

**Browsing Models:**
1. Navigate to "Model Library"
2. Use the filters to narrow down models:
   - Filter by Tool (CarMaker, Simulink, PreScan)
   - Filter by Type (Vehicle Dynamics, Sensor, Powertrain)
3. Click on any model card to view more details

**Model Information:**
Each model includes:
- Name and version
- Associated tool
- Model type
- Description
- Tags for easy searching
- Author and modification dates

**Actions:**
- **View Details**: See complete model information
- **Edit**: Open the model in the editor

### 3. Model Editor

Create new models or edit existing ones.

**Creating a New Model:**
1. Navigate to "Model Editor"
2. Click "New Model"
3. Fill in the model information:
   - Model Name
   - Tool (select from dropdown)
   - Type (select from dropdown)
   - Version
   - Description
   - Tags (comma-separated)
4. Configure model parameters
5. Click "Save Model"

**Editing an Existing Model:**
1. Navigate to "Model Editor"
2. Click "Load Existing Model"
3. Select the model you want to edit
4. Modify the fields as needed
5. Click "Save Model"

**Model Validation:**
- Click "Validate" to check if the model configuration is correct
- The system will verify parameters and tool compatibility

**Preview:**
- Click "Preview" to see how the model will appear in the tool

### 4. Sharing Hub

Manage how models are shared externally and accessed internally.

**External Sharing:**

Share models with OEMs, suppliers, and tool vendors.

**Creating a Share:**
1. Navigate to "Sharing Hub"
2. Click "Create New Share"
3. Fill in the sharing information:
   - Model ID
   - Partner name
   - Type (OEM, Supplier, or Tool Vendor)
   - Expiry Date
4. Click "Create Share"

**Managing Shares:**
- View all active shares
- See permissions and expiry dates
- Revoke sharing by clicking "Revoke"

**Internal Access:**

View which Bosch domains have access to specific models.

Each internal access record shows:
- Model ID
- Domain name
- Access level
- List of users with access

## Best Practices

### Model Management

1. **Use Descriptive Names**: Choose clear, descriptive names for your models
2. **Add Comprehensive Tags**: Use multiple tags to make models easy to find
3. **Update Descriptions**: Keep model descriptions current and detailed
4. **Version Control**: Increment version numbers when making significant changes

### Sharing Guidelines

1. **Set Expiry Dates**: Always set appropriate expiry dates for external shares
2. **Minimal Permissions**: Grant only the permissions needed
3. **Regular Reviews**: Periodically review and revoke outdated shares
4. **Documentation**: Document the purpose of each share

### Tool Integration

1. **Connect When Needed**: Only connect to tools you're actively using
2. **Disconnect After Use**: Free up resources by disconnecting when done
3. **Check Status**: Verify tool connection status before starting work

## Troubleshooting

### Cannot Connect to Tool

**Issue**: Tool connection fails

**Solutions**:
- Verify the tool is installed and running
- Check network connectivity
- Ensure you have proper permissions
- Try disconnecting and reconnecting

### Model Not Appearing in Library

**Issue**: Saved model doesn't appear

**Solutions**:
- Refresh the page
- Check filter settings
- Verify the model was saved successfully
- Check if the correct tool is selected

### Cannot Create Share

**Issue**: Sharing creation fails

**Solutions**:
- Verify all required fields are filled
- Check that the model ID exists
- Ensure you have permission to share the model
- Verify the expiry date is in the future

## Tips and Tricks

1. **Keyboard Shortcuts**: Use browser navigation (Ctrl+F) to quickly search within pages
2. **Batch Operations**: Select multiple models by opening them in different tabs
3. **Filter Combinations**: Combine multiple filters for precise model searching
4. **Regular Backups**: Export important models regularly

## Support

For technical support or feature requests, contact:
- Email: virtuspace-support@bosch.com
- Internal Portal: virtuspace.bosch.com

## Glossary

- **OEM**: Original Equipment Manufacturer
- **Model**: A simulation configuration for a specific tool
- **Tool**: External simulation software (CarMaker, Simulink, etc.)
- **Domain**: A division or department within Bosch
- **Share**: Permission granted to external parties to access a model
