/**
 * Directory: backend/routes/
 * Description: Lecturer routes with authentication middleware.
 */
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const lecturerController = require('../controllers/lecturerController');

router.use(protect(['lecturer'])); // Require JWT and restrict to lecturer role

router.post('/courses', lecturerController.createCourse);
router.get('/courses', lecturerController.getMyCourses);
router.post('/qr-code', lecturerController.generateQRCode);
router.post('/enrollment-key', lecturerController.setEnrollmentKey);
router.get('/attendance/:courseId', lecturerController.getAttendanceList);

module.exports = router;