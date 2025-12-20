const express = require('express');
const router = express.Router();

// Sharing records
let sharingRecords = [
  {
    id: 'share-001',
    modelId: 'model-001',
    sharedWith: 'OEM Partner A',
    type: 'oem',
    permissions: ['read', 'execute'],
    sharedDate: '2024-03-01',
    expiryDate: '2024-12-31',
    status: 'active'
  },
  {
    id: 'share-002',
    modelId: 'model-002',
    sharedWith: 'Tier1 Supplier B',
    type: 'supplier',
    permissions: ['read'],
    sharedDate: '2024-03-10',
    expiryDate: '2024-09-30',
    status: 'active'
  }
];

// Internal access records
let internalAccess = [
  {
    modelId: 'model-001',
    domain: 'Sensor Systems',
    accessLevel: 'full',
    users: ['user1@bosch.com', 'user2@bosch.com']
  },
  {
    modelId: 'model-003',
    domain: 'Brake Systems',
    accessLevel: 'full',
    users: ['user3@bosch.com', 'user4@bosch.com']
  }
];

// GET all sharing records (exclude revoked by default)
router.get('/', (req, res) => {
  const includeRevoked = req.query.includeRevoked === 'true';
  const records = includeRevoked 
    ? sharingRecords 
    : sharingRecords.filter(s => s.status !== 'revoked');
  res.json(records);
});

// GET sharing records for a specific model (exclude revoked by default)
router.get('/model/:modelId', (req, res) => {
  const includeRevoked = req.query.includeRevoked === 'true';
  const records = sharingRecords.filter(s => 
    s.modelId === req.params.modelId && 
    (includeRevoked || s.status !== 'revoked')
  );
  res.json(records);
});

// POST - Create new sharing record
router.post('/', (req, res) => {
  const newShare = {
    id: `share-${String(sharingRecords.length + 1).padStart(3, '0')}`,
    ...req.body,
    sharedDate: new Date().toISOString().split('T')[0],
    status: 'active'
  };
  sharingRecords.push(newShare);
  res.status(201).json(newShare);
});

// DELETE - Revoke sharing (soft delete by marking as revoked)
router.delete('/:id', (req, res) => {
  const index = sharingRecords.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    sharingRecords[index].status = 'revoked';
    sharingRecords[index].revokedDate = new Date().toISOString().split('T')[0];
    res.json({ message: 'Sharing revoked', record: sharingRecords[index] });
  } else {
    res.status(404).json({ error: 'Sharing record not found' });
  }
});

// GET internal access records
router.get('/internal', (req, res) => {
  res.json(internalAccess);
});

// POST - Grant internal access
router.post('/internal', (req, res) => {
  const newAccess = {
    ...req.body
  };
  internalAccess.push(newAccess);
  res.status(201).json(newAccess);
});

module.exports = router;
