/**
 * Directory: backend/routes/
 * Description: Routes for authentication (login, register) and fetching departments for signup dropdown.
 */
const express = require('express');
const router = express.Router();
const { getDepartments, register, login } = require('../controllers/authController');

router.get('/departments', getDepartments);
router.post('/register', register);
router.post('/login', login);

module.exports = router;