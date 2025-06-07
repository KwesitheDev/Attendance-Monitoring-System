/**
 * Directory: backend/controllers/
 * Description: Handles lecturer actions: creating courses (pending approval), generating QR codes for sessions,
 * and viewing course students.
 */
const Course = require('../models/Course');
const Session = require('../models/Session');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

const createCourse = async (req, res, next) => {
    const { name, code, department, year, enrollmentPassword } = req.body;
    try {
        let course = await Course.findOne({ code });
        if (course) return res.status(400).json({ message: 'Course already exists' });

        const deptExists = await Department.findById(department);
        if (!deptExists) return res.status(400).json({ message: 'Invalid department' });

        if (![1, 2, 3, 4].includes(year)) return res.status(400).json({ message: 'Invalid year' });

        course = new Course({ name, code, department, year, lecturer: req.user.id, enrollmentPassword });
        await course.save();
        res.json({ message: 'Course created (pending approval)', course });
    } catch (error) {
        next(error);
    }
};

const generateQRCode = async (req, res, next) => {
    const { courseId, sessionDate } = req.body;
    const sessionId = uuidv4();
    const qrData = JSON.stringify({ sessionId, courseId, timestamp: Date.now() });

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (course.lecturer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const qrCodeUrl = await QRCode.toDataURL(qrData);
        const session = await Session.create({
            sessionId,
            course: courseId,
            lecturer: req.user.id,
            date: sessionDate,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5-minute expiration
        });

        res.json({ qrCodeUrl, session });
    } catch (error) {
        next(error);
    }
};

const getCourseStudents = async (req, res, next) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId).populate('students', 'name email');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (course.lecturer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        res.json(course.students);
    } catch (error) {
        next(error);
    }
};

module.exports = { createCourse, generateQRCode, getCourseStudents };