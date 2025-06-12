const Course = require('../models/Course');
const Session = require('../models/Session');
const Attendance = require('../models/Attendance');
const bcrypt = require('bcryptjs');

const enrollCourse = async (req, res) => {
    const { courseCode, enrollmentKey } = req.body;
    try {
        const course = await Course.findOne({ code: courseCode });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (!course.enrollmentPassword) {
            return res.status(400).json({ message: 'Enrollment key not set for this course' });
        }
        const isMatch = await bcrypt.compare(enrollmentKey, course.enrollmentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid enrollment key' });
        }
        if (course.students.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }
        course.students.push(req.user.id);
        await course.save();
        res.json({ message: 'Enrolled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling in course', error });
    }
};

const markAttendance = async (req, res) => {
    const { sessionId, courseId } = req.body;
    try {
        const session = await Session.findById(sessionId);
        if (!session || session.course.toString() !== courseId || session.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired session' });
        }
        const course = await Course.findById(courseId);
        if (!course || !course.students.includes(req.user.id)) {
            return res.status(403).json({ message: 'Not enrolled in this course' });
        }
        const existingAttendance = await Attendance.findOne({
            course: courseId,
            student: req.user.id,
            session: sessionId
        });
        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance already marked' });
        }
        const attendance = new Attendance({
            course: courseId,
            student: req.user.id,
            session: sessionId
        });
        await attendance.save();
        res.json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error });
    }
};

const getMyCourses = async (req, res) => {
    try {
        const courses = await Course.find({ students: req.user.id })
            .populate('department', 'name code')
            .populate('lecturer', 'name');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};

module.exports = { enrollCourse, markAttendance, getMyCourses };