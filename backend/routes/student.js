const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect, authorize } = require('../middlewares/auth');
const { enrollCourse, markAttendance, getMyCourses } = require('../controllers/student');

router.use(protect);
router.use(authorize('student'));

router.post('/enroll', asyncHandler(enrollCourse));
router.post('/attendance', asyncHandler(markAttendance));
router.get('/courses', asyncHandler(getMyCourses));

module.exports = router;