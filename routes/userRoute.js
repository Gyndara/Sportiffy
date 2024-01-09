const  express =  require ('express');
const { register, getUserById, login, approvePartner, logout, updateUser, deleteUser } = require('../controller/usersController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get users by ID
router.get('/:id_user', authenticateToken, getUserById);

router.post('/login', login);

router.put('/admin/approve/:id_user', approvePartner);

router.delete('/logout',authenticateToken, logout);
// Create a new user
router.post('/register', register);

// Update a new user
router.patch('/:id_user', authenticateToken, updateUser);

// Delete A user
router.delete('/:id_user', deleteUser);

module.exports = router;