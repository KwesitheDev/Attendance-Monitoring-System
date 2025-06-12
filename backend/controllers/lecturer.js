const Course = require('../models/Course');
const Session = require('../models/Session');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createCourse = async (req, res) => {
    const { name, code, year, department } = req.body;
    try {
        const course = new Course({
            name,
            code,
            year,
            department,
            lecturer: req.user.id
        });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

const getMyCourses = async (req, res) => {
    try {
        const courses = await Course.find({ lecturer: req.user.id }).populate('department', 'name code');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};

const generateQRCode = async (req, res) => {
    const { courseId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    try {
        const course = await Course.findById(courseId);
        if (!course || course.lecturer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized or course not found' });
        }
        let session = await Session.findOne({
            course: courseId,
            date: { $gte: today, $lt: tomorrow }
        });
        if (!session) {
            session = new Session({
                course: courseId,
                date: new Date(),
                expiresAt: tomorrow
            });
            await session.save();
        }
        const qrUrl = `https://attendance-student.netlify.app/scan?sessionId=${session._id}&courseId=${courseId}`;
        res.json({ qrUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error generating QR code', error });
    }
};

const setEnrollmentKey = async (req, res) => {
    const { courseId, enrollmentKey } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course || course.lecturer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized or course not found' });
        }
        const hashedKey = await bcrypt.hash(enrollmentKey, 10);
        course.enrollmentPassword = hashedKey;
        await course.save();
        res.json({ message: 'Enrollment key set successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error setting enrollment key', error });
    }
};

const getAttendanceList = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if (!course || course.lecturer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized or course not found' });
        }
        const attendances = await Attendance.find({ course: courseId })
            .populate('student', 'name')
            .populate('session', 'date');
        const totalSessions = await Session.countDocuments({ course: courseId });
        const attendanceByStudent = {};
        for (const att of attendances) {
            const studentId = att.student._id.toString();
            if (!attendanceByStudent[studentId]) {
                attendanceByStudent[studentId] = {
                    name: att.student.name,
                    sessions: [],
                    percentage: 0
                };
            }
            attendanceByStudent[studentId].sessions.push(att.session.date);
        }
        const result = Object.values(attendanceByStudent).map(student => ({
            ...student,
            percentage: totalSessions ? (student.sessions.length / totalSessions) * 100 : 0
        }));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error });
    }
};

module.exports = { createCourse, getMyCourses, generateQRCode, setEnrollmentKey, getAttendanceList };