const express = require('express');
const { getVenue, getVenueById, createVenue, updateVenue, deleteVenue } = require('../controller/venueController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Middleware untuk memeriksa peran pengguna
// const checkUserRole = (req, res, next) => {
//     const { kategori_user } = req.user; // Ganti dengan cara Anda untuk mendapatkan peran pengguna

//     // Jika peran adalah 'user', kembalikan status 403 (Akses Ditolak)
//     if (kategori_user === 'USER') {
//         return res.status(403).json({ message: 'Access forbidden' });
//     }
//     next();
// };

// Get all venue (Tersedia untuk semua jenis pengguna)
router.get('/', getVenue);

// Get venue by ID (Tersedia untuk semua jenis pengguna)
router.get('/:idVenue', getVenueById);

// Create a new venue
router.post('/', createVenue);

// Update a venue
router.patch('/:idVenue', updateVenue);

// Delete a field
router.delete('/:idVenue', deleteVenue);

module.exports = router;
