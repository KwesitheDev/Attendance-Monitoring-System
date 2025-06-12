const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { register, login, getUser, getDepartments } = require('../controllers/auth');
const { protect, authorize } = require('../middlewares/auth');

router.post('/register', protect, authorize('admin'), asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/user', protect, authorize('admin', 'lecturer', 'student'), asyncHandler(getUser));
router.get('/departments', protect, authorize('admin', 'lecturer', 'student'), asyncHandler(getDepartments));

module.exports = router;