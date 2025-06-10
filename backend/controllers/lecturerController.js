/**
 * Directory: backend/controllers/
 * Description: Lecturer-specific actions: course creation, QR code generation, enrollment keys, attendance.
 */
const bcrypt = require('bcryptjs');
const Course = require('../models/Course');
const Department = require('../models/Department');
const Session = require('../models/Session');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

const createCourse = async (req, res, next) => {
    const { name, code, department, year } = req.body;
    try {
        const dept = await Department.findById(department);
        if (!dept) return res.status(400).json({ message: 'Invalid department' });

        const course = new Course({
            name,
            code,
            department,
            year,
            lecturer: req.user.id, // Auto-assign lecturer
        });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        next(error);
    }
};

const getMyCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({ lecturer: req.user.id }).populate('department');
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

const generateQRCode = async (req, res, next) => {
    const { courseId } = req.body;
    try {
        const course = await Course.findOne({ _id: courseId, lecturer: req.user.id });
        if (!course) return res.status(400).json({ message: 'Course not found or unauthorized' });

        const sessionId = new mongoose.Types.ObjectId();
        const qrData = JSON.stringify({ sessionId, courseId });
        const session = new Session({
            course: courseId,
            lecturer: req.user.id,
            qrCode: qrData,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min expiry
        });
        await session.save();
        res.json({ qrCode: qrData, sessionId });
    } catch (error) {
        next(error);
    }
};

const setEnrollmentKey = async (req, res, next) => {
    const { courseId, enrollmentPassword } = req.body;
    try {
        const course = await Course.findOne({ _id: courseId, lecturer: req.user.id });
        if (!course) return res.status(400).json({ message: 'Course not found or unauthorized' });

        const salt = await bcrypt.genSalt(10);
        course.enrollmentPassword = await bcrypt.hash(enrollmentPassword, salt);
        await course.save();
        res.json({ message: 'Enrollment key set' });
    } catch (error) {
        next(error);
    }
};

const getAttendanceList = async (req, res, next) => {
    const { courseId, minPercentage, sortBy, search } = req.query;
    try {
        const course = await Course.findOne({ _id: courseId, lecturer: req.user.id }).populate('students');
        if (!course) return res.status(400).json({ message: 'Course not found or unauthorized' });

        const totalSessions = await Session.countDocuments({ course: courseId });
        const attendanceRecords = await Attendance.aggregate([
            { $match: { course: new mongoose.Types.ObjectId(courseId) } },
            {
                $group: {
                    _id: '$student',
                    attendedSessions: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'student',
                },
            },
            { $unwind: '$student' },
            {
                $project: {
                    studentId: '$_id',
                    name: '$student.name',
                    attendedSessions: 1,
                    totalSessions: { $literal: totalSessions },
                    attendancePercentage: {
                        $multiply: [{ $divide: ['$attendedSessions', { $max: [totalSessions, 1] }] }, 100],
                    },
                },
            },
            search ? { $match: { name: { $regex: search, $options: 'i' } } } : {},
            minPercentage ? { $match: { attendancePercentage: { $gte: parseFloat(minPercentage) } } } : {},
            {
                $sort: sortBy === 'name' ? { name: 1 } : { attendancePercentage: -1 },
            },
        ]);

        res.json({
            totalSessions,
            students: attendanceRecords.map(record => ({
                studentId: record.studentId,
                name: record.name,
                attendedSessions: record.attendedSessions,
                totalSessions: record.totalSessions,
                attendancePercentage: record.attendancePercentage.toFixed(2),
            })),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createCourse, getMyCourses, generateQRCode, setEnrollmentKey, getAttendanceList };