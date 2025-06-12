const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect, authorize } = require('../middlewares/auth');
const {
    createCourse,
    getMyCourses,
    generateQRCode,
    setEnrollmentKey,
    getAttendanceList
} = require('../controllers/lecturer');

router.use(protect);
router.use(authorize('lecturer'));

router.post('/courses', asyncHandler(createCourse));
router.get('/courses', asyncHandler(getMyCourses));
router.post('/qr-code', asyncHandler(generateQRCode));
router.post('/enrollment-key', asyncHandler(setEnrollmentKey));
router.get('/attendance/:courseId', asyncHandler(getAttendanceList));

module.exports = router;