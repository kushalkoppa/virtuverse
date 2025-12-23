const express = require('express');
const router = express.Router();

// Mock plant sharing data
let plantShares = [
  {
    id: 1,
    modelId: 1,
    sharedWith: 'supplier@example.com',
    permission: 'read',
    sharedDate: new Date().toISOString()
  }
];

// GET all plant shares
router.get('/', (req, res) => {
  res.json(plantShares);
});

// POST create a new plant share
router.post('/', (req, res) => {
  const newShare = {
    id: plantShares.length + 1,
    ...req.body,
    sharedDate: new Date().toISOString()
  };
  plantShares.push(newShare);
  res.status(201).json(newShare);
});

// DELETE a plant share
router.delete('/:id', (req, res) => {
  const shareIndex = plantShares.findIndex(s => s.id === parseInt(req.params.id));
  if (shareIndex === -1) {
    return res.status(404).json({ error: 'Share not found' });
  }
  plantShares.splice(shareIndex, 1);
  res.status(204).send();
});

module.exports = router;
