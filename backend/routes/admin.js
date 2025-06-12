const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
    getUsers,
    createDepartment,
    deleteUser,
    getCourses,
    assignLecturer,
    deleteCourse,
    getAuditLogs
} = require('../controllers/admin');

// Admin-only routes
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.post('/departments', createDepartment);
router.delete('/users/:userId', deleteUser);
router.get('/courses', getCourses);
router.patch('/courses/:courseId/assign', assignLecturer);
router.delete('/courses/:courseId', deleteCourse);
router.get('/audit-logs', getAuditLogs);

module.exports = router;