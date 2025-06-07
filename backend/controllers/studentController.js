/**
 * Directory: backend/controllers/
 * Description: Handles student actions: enrolling in courses, scanning QR codes for attendance,
 * and viewing attendance records.
 */
const Course = require('../models/Course');
const Session = require('../models/Session');
const Attendance = require('../models/Attendance');
const bcrypt = require('bcryptjs');

const enrollCourse = async (req, res, next) => {
    const { password } = req.body;
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.department.toString() !== req.user.department.toString()) {
            return res.status(403).json({ message: 'Course not in your department' });
        }

        if (course.enrollmentPassword && !(await bcrypt.compare(password, course.enrollmentPassword))) {
            return res.status(400).json({ message: 'Invalid enrollment password' });
        }

        if (!course.students.includes(req.user.id)) {
            course.students.push(req.user.id);
            await course.save();
        }

        res.json({ message: 'Enrolled successfully', course });
    } catch (error) {
        next(error);
    }
};

const scanAttendance = async (req, res, next) => {
    const { sessionId, courseId } = req.body;
    try {
        const session = await Session.findOne({ sessionId, course: courseId });
        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (session.expiresAt < new Date()) return res.status(400).json({ message: 'QR code expired' });

        const course = await Course.findById(courseId);
        if (!course.students.includes(req.user.id)) {
            return res.status(403).json({ message: 'Not enrolled in course' });
        }

        const existingAttendance = await Attendance.findOne({ student: req.user.id, session: session._id });
        if (existingAttendance) return res.status(400).json({ message: 'Attendance already recorded' });

        const attendance = new Attendance({
            student: req.user.id,
            session: session._id,
            course: courseId,
        });
        await attendance.save();

        // Notify lecturer via Socket.IO
        req.app.get('io').emit(`attendance:${courseId}`, {
            student: req.user.name,
            sessionId,
            timestamp: new Date(),
        });

        res.json({ message: 'Attendance recorded' });
    } catch (error) {
        next(error);
    }
};

const getMyAttendance = async (req, res, next) => {
    try {
        const courses = await Course.find({ students: req.user.id });
        const attendance = await Attendance.find({ student: req.user.id }).populate('session course');
        res.json({ courses, attendance });
    } catch (error) {
        next(error);
    }
};

module.exports = { enrollCourse, scanAttendance, getMyAttendance };