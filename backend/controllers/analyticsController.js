/**
 * Directory: backend/controllers/
 * Description: Provides analytics for admins (system stats) and lecturers (course attendance).
 */
const User = require('../models/User');
const Course = require('../models/Course');
const Department = require('../models/Department');
const Attendance = require('../models/Attendance');

const getSystemStats = async (req, res, next) => {
    try {
        const users = await User.countDocuments();
        const courses = await Course.countDocuments();
        const departments = await Department.countDocuments();
        const attendance = await Attendance.countDocuments();
        res.json({ users, courses, departments, attendance });
    } catch (error) {
        next(error);
    }
};

const getCourseAttendance = async (req, res, next) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (req.user.role !== 'admin' && course.lecturer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const attendance = await Attendance.aggregate([
            { $match: { course: mongoose.Types.ObjectId(courseId) } },
            {
                $group: {
                    _id: '$session',
                    count: { $sum: 1 },
                    date: { $first: '$date' },
                },
            },
            { $sort: { date: 1 } },
        ]);

        res.json({ course, attendance });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSystemStats, getCourseAttendance };