/**
 * Directory: backend/routes/
 * Description: Authentication routes using authController.
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protect = require('../middleware/auth');

router.get('/departments', authController.getDepartments);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', protect(), authController.getUser);

module.exports = router;