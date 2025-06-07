/**
 * Directory: backend/routes/
 * Description: Routes for analytics: system stats for admins and course attendance for lecturers/admins.
 */
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getSystemStats, getCourseAttendance } = require('../controllers/analyticsController');

router.get('/stats', protect(['admin']), getSystemStats);
router.get('/course/:courseId', protect(['admin', 'lecturer']), getCourseAttendance);

module.exports = router;