/**
 * Directory: backend/routes/
 * Description: Routes for admin actions: creating users, departments, courses, and viewing audit logs.
 */
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createUser, createDepartment, createCourse, getAuditLogs } = require('../controllers/adminController');

router.post('/users', protect(['admin']), createUser);
router.post('/departments', protect(['admin']), createDepartment);
router.post('/courses', protect(['admin']), createCourse);
router.get('/audit-logs', protect(['admin']), getAuditLogs);

module.exports = router;