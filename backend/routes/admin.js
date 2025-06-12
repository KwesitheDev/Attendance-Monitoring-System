const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect, authorize } = require('../middlewares/auth');
const {
    getUsers,
    createDepartment,
    deleteUser,
    getCourses,
    assignLecturer,
    deleteCourse,
    getAuditLogs,
    createCourse
} = require('../controllers/admin');

// Admin-only routes
router.use(protect);
router.use(authorize('admin'));

router.get('/users', asyncHandler(getUsers));
router.post('/departments', asyncHandler(createDepartment));
router.delete('/users/:userId', asyncHandler(deleteUser));
router.get('/courses', asyncHandler(getCourses));
router.post('/courses', asyncHandler(createCourse));
router.patch('/courses/:courseId/assign', asyncHandler(assignLecturer));
router.delete('/courses/:courseId', asyncHandler(deleteCourse));
router.get('/audit-logs', asyncHandler(getAuditLogs));

module.exports = router;