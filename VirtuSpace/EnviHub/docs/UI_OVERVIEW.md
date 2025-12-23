# EnviHub UI Overview

## User Interface Components

### 1. Dashboard (Home Page)

**Purpose:** Overview of the EnviHub platform and quick access to all features

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ 🌐 EnviHub                                          │
│ VirtuSpace Platform                                 │
├─────────────────────────────────────────────────────┤
│ Dashboard | Tool Interfaces | Model Library |      │
│ Model Editor | Sharing Hub                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                │
│  │ 🔧 Tool      │  │ 📚 Model     │                │
│  │ Interfaces   │  │ Library      │                │
│  │ 3 Connected  │  │ 12 Models    │                │
│  └──────────────┘  └──────────────┘                │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                │
│  │ ✏️ Model     │  │ 🔗 Sharing   │                │
│  │ Editor       │  │ Hub          │                │
│  │ 2 In Progress│  │ 5 Active     │                │
│  └──────────────┘  └──────────────┘                │
│                                                      │
│  Platform Capabilities:                             │
│  • Unified Tool Access                              │
│  • Model Storage                                    │
│  • External Collaboration                           │
│  • Internal Usage                                   │
│  • Model Management                                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Quick overview cards for each major feature
- Current statistics (connected tools, available models, etc.)
- Platform capabilities list
- Easy navigation to all sections

### 2. Tool Interfaces Page

**Purpose:** Manage connections to simulation tools like IPG CarMaker

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Tool Interfaces                                     │
│ Connect and manage interfaces to simulation tools   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │ IPG CarMaker                    v12.0       │   │
│  │ vehicle-dynamics                            │   │
│  │                                             │   │
│  │ Virtual test driving for chassis and        │   │
│  │ vehicle dynamics simulation                 │   │
│  │                                             │   │
│  │ Capabilities:                               │   │
│  │ [vehicle-dynamics] [adas] [autonomous]      │   │
│  │                                             │   │
│  │ Status: [Connected]  [Disconnect]           │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │ MATLAB Simulink                 v2023b      │   │
│  │ model-based-design                          │   │
│  │ ...                                         │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Features:**
- List of all available simulation tools
- Tool version and type information
- Capability badges
- Connection status indicators
- Connect/Disconnect buttons
- Tool descriptions

**Supported Tools:**
1. IPG CarMaker - Vehicle dynamics simulation
2. MATLAB Simulink - Model-based design
3. PreScan - Sensor simulation

### 3. Model Library Page

**Purpose:** Browse and search simulation models

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Model Library                                       │
│ Browse and manage simulation models                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Filters: [All Tools ▼] [All Types ▼]              │
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │ Sedan Vehicle Dynamics Model                │   │
│  │ v1.0 | carmaker | vehicle-dynamics          │   │
│  │                                             │   │
│  │ Complete vehicle dynamics model for         │   │
│  │ mid-size sedan                              │   │
│  │                                             │   │
│  │ Tags: [sedan] [vehicle-dynamics]            │   │
│  │       [passenger-car]                       │   │
│  │                                             │   │
│  │ Author: Bosch Engineering                   │   │
│  │ Modified: 2024-02-20                        │   │
│  │                                             │   │
│  │               [View Details]  [Edit]        │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
│  [Additional model cards...]                        │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Filter by tool (CarMaker, Simulink, PreScan)
- Filter by type (Vehicle Dynamics, Sensor, Powertrain)
- Model cards with key information
- Tag-based organization
- Author and modification date tracking
- Quick actions (View Details, Edit)

### 4. Model Editor Page

**Purpose:** Create and edit simulation models

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Model Editor                                        │
│ Create new or edit existing simulation models      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [Load Existing Model]  [New Model]                 │
│                                                      │
│  ┌─── Model Information ─────────────────────┐     │
│  │                                            │     │
│  │ Model Name: [________________]             │     │
│  │                                            │     │
│  │ Tool: [CarMaker ▼]  Type: [Type ▼]        │     │
│  │ Version: [1.0]                             │     │
│  │                                            │     │
│  │ Description:                               │     │
│  │ [_________________________________]        │     │
│  │ [_________________________________]        │     │
│  │                                            │     │
│  │ Tags: [tag1, tag2, tag3]                   │     │
│  │                                            │     │
│  └────────────────────────────────────────────┘     │
│                                                      │
│  ┌─── Model Parameters ──────────────────────┐     │
│  │                                            │     │
│  │ Configure tool-specific parameters         │     │
│  │                                            │     │
│  │ {                                          │     │
│  │   // Add parameters here                   │     │
│  │ }                                          │     │
│  │                                            │     │
│  └────────────────────────────────────────────┘     │
│                                                      │
│  [Save Model]  [Validate]  [Preview]                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Load existing models for editing
- Create new models from scratch
- Form-based model configuration
- Tool and type selection dropdowns
- Version management
- Description and tags
- Parameter configuration
- Validation before saving
- Preview functionality

### 5. Sharing Hub Page

**Purpose:** Manage external sharing and internal access

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Sharing Hub                                         │
│ Manage model sharing with partners and domains     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [Create New Share]                                 │
│                                                      │
│  External Sharing                                   │
│  ┌─────────────────────────────────────────────┐   │
│  │ OEM Partner A                               │   │
│  │ Model: model-001 | Type: oem               │   │
│  │                                             │   │
│  │ Permissions: read, execute                  │   │
│  │ Shared: 2024-03-01 | Expires: 2024-12-31   │   │
│  │                                             │   │
│  │                      [Active]  [Revoke]     │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
│  Internal Access (Bosch Domains)                    │
│  ┌─────────────────────────────────────────────┐   │
│  │ Chassis Systems                             │   │
│  │ Model: model-001 | Access: full            │   │
│  │                                             │   │
│  │ Users: 2 user(s)                            │   │
│  │ user1@bosch.com, user2@bosch.com            │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Create new sharing records
- External sharing section:
  - OEM partners
  - Tier1 suppliers
  - Tool vendors
  - Permission management
  - Expiry date tracking
  - Revocation capability
- Internal access section:
  - Bosch domain access
  - User lists
  - Access level management

## Navigation

**Header:**
- Logo and platform name (🌐 EnviHub)
- Subtitle (VirtuSpace Platform)

**Navigation Bar:**
- Dashboard (Home)
- Tool Interfaces
- Model Library
- Model Editor
- Sharing Hub

**Footer:**
- Copyright information
- VirtuVerse branding

## Design System

**Colors:**
- Primary Blue: #1e3a8a (Headers, active states)
- Light Blue: #3b82f6 (Buttons, accents)
- Background: #f5f5f5 (Page background)
- White: #ffffff (Cards, main content)
- Gray: #6b7280 (Secondary text)
- Success Green: #10b981 (Success badges)
- Warning Yellow: #fbbf24 (Warning badges)
- Info Blue: #3b82f6 (Info badges)

**Typography:**
- System fonts for readability
- Consistent heading hierarchy
- Clear font sizes and weights

**Components:**
- Cards with hover effects
- Rounded corners (8px)
- Subtle shadows
- Color-coded badges
- Responsive buttons

## Responsive Design

The UI is designed to work on:
- Desktop (1400px+)
- Tablet (768px-1400px)
- Mobile (320px-768px)

## User Experience

**Key UX Features:**
1. **Clear Navigation:** Always visible navigation bar
2. **Intuitive Layout:** Card-based design for easy scanning
3. **Visual Feedback:** Hover effects, status indicators
4. **Filtering:** Quick filters on library pages
5. **Action Buttons:** Clear call-to-action buttons
6. **Status Indicators:** Color-coded badges for states
7. **Responsive Forms:** Easy-to-use form inputs
8. **Helpful Text:** Descriptions and guidance throughout

## Accessibility

- Semantic HTML structure
- Clear text contrast ratios
- Keyboard navigation support
- Descriptive labels and placeholders
- Error messaging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
