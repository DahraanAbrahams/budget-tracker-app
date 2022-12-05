const express = require('express')
const router = express.Router()
const { register_User, login_User, get_User } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware')

router.post('/', register_User)
router.post('/login', login_User)
router.get('/user', protect, get_User)

module.exports = router;