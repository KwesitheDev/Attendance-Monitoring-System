/**
 * Directory: backend/routes/
 * Description: Routes for lecturer actions: creating courses, generating QR codes, and viewing course students.
 */
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createCourse, generateQRCode, getCourseStudents } = require('../controllers/lecturerController');

router.post('/courses', protect(['lecturer']), createCourse);
router.post('/sessions', protect(['lecturer']), generateQRCode);
router.get('/courses/:courseId/students', protect(['lecturer']), getCourseStudents);

module.exports = router;