const express = require('express');
const { getBooking, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controller/bookingController');

const router = express.Router();

router.get('/', getBooking);
router.get('/:transaction', getBookingById);
router.post('/', createBooking);
router.patch('/:transaction', updateBooking);
router.delete('/:transaction', deleteBooking);

module.exports = router;