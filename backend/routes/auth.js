const express = require('express');
const router = express.Router();
const { register, login, getUser, getDepartments } = require('../controllers/auth');
const { protect } = require('../middlewares/auth');

router.post('/register', protect(['admin']), register);
router.post('/login', login);
router.get('/user', protect(['admin', 'lecturer', 'student']), getUser);
router.get('/departments', protect(['admin', 'lecturer', 'student']), getDepartments);

module.exports = router;