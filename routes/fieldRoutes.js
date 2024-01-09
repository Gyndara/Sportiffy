const express = require('express');
const { getField, getFieldById, createField, updateField, deleteField } = require('../controller/fieldController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all fields
router.get('/', getField);

// Get field by ID
router.get('/:idField', getFieldById);

// Create a new field
router.post('/', createField);

// Update a field
router.patch('/:idField', updateField);

// Delete a field
router.delete('/:idField', deleteField);

module.exports = router;