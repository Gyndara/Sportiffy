const  express =  require ('express');
const { getUser } = require('../controller/usersController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getUser)

module.exports = router;