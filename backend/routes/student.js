/**
 * Directory: backend/routes/
 * Description: Routes for student actions: enrolling in courses, scanning QR codes, and viewing attendance.
 */
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { enrollCourse, scanAttendance, getMyAttendance } = require('../controllers/studentController');

router.post('/courses/:id/enroll', protect(['student']), enrollCourse);
router.post('/attendance/scan', protect(['student']), scanAttendance);
router.get('/attendance/my-courses', protect(['student']), getMyAttendance);

module.exports = router;