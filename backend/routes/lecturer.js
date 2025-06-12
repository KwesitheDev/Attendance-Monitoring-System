const express = require('express');
const router = express.Router();
const { createCourse, getMyCourses, generateQRCode, setEnrollmentKey, getAttendanceList } = require('../controllers/lecturer');
const { protect } = require('../middlewares/auth');

router.post('/courses', protect(['lecturer']), createCourse);
router.get('/courses', protect(['lecturer']), getMyCourses);
router.post('/qr-code', protect(['lecturer']), generateQRCode);
router.post('/enrollment-key', protect(['lecturer']), setEnrollmentKey);
router.get('/attendance/:courseId', protect(['lecturer']), getAttendanceList);

module.exports = router;