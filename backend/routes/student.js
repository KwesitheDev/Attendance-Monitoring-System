const express = require('express');
const router = express.Router();
const { enrollCourse, markAttendance, getMyCourses } = require('../controllers/student');
const { protect } = require('../middlewares/auth');

router.post('/enroll', protect(['student']), enrollCourse);
router.post('/attendance', protect(['student']), markAttendance);
router.get('/courses', protect(['student']), getMyCourses);

module.exports = router;