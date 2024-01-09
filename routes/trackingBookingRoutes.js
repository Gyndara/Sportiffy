const express = require('express');
const { createTrackingBooking, deleteTrackingBooking, getTrackingBooking, getTrackingBookingById, updateTrackingBooking } =  require ('../controller/trackingBookingController');

const router = express.Router();

// Get all fields
router.get('/',  getTrackingBooking);

// Get field by ID
router.get('/:idTracking',  getTrackingBookingById);

// Create a new field
router.post('/',  createTrackingBooking);

// Update a field
router.patch('/:idTracking',  updateTrackingBooking);

// Delete a field
router.delete('/:idTracking',  deleteTrackingBooking);

module.exports =  router;