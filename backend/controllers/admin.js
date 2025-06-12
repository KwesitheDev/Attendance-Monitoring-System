const User = require('../models/User');
const Course = require('../models/Course');
const AuditLog = require('../models/AuditLog');
const Department = require('../models/Department');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('department', 'name code');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createDepartment = async (req, res) => {
    const { name, code } = req.body;
    try {
        const department = new Department({ name, code });
        await department.save();
        await AuditLog.create({
            user: req.user.id,
            action: 'CREATE_DEPARTMENT',
            details: `Created department: ${name} (${code})`
        });
        res.status(201).json(department);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create department' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await AuditLog.create({
            user: req.user.id,
            action: 'DELETE_USER',
            details: `Deleted user: ${user.email}`
        });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('department lecturer');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const assignLecturer = async (req, res) => {
    const { lecturerId } = req.body;
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        const lecturer = await User.findById(lecturerId);
        if (!lecturer || lecturer.role !== 'lecturer') {
            return res.status(400).json({ message: 'Invalid lecturer' });
        }
        course.lecturer = lecturerId;
        await course.save();
        await AuditLog.create({
            user: req.user.id,
            action: 'ASSIGN_LECTURER',
            details: `Assigned lecturer ${lecturer.email} to course ${course.name}`
        });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        await AuditLog.create({
            user: req.user.id,
            action: 'DELETE_COURSE',
            details: `Deleted course: ${course.name}`
        });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find().populate('user', 'name email');
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
const createCourse = async (req, res) => {
    const { name, code, year, department, lecturer } = req.body;
    try {
        const departmentExists = await Department.findById(department);
        if (!departmentExists) {
            return res.status(400).json({ message: 'Invalid department' });
        }
        if (lecturer) {
            const lecturerExists = await User.findById(lecturer);
            if (!lecturerExists || lecturerExists.role !== 'lecturer') {
                return res.status(400).json({ message: 'Invalid lecturer' });
            }
        }
        const course = new Course({
            name,
            code,
            year,
            department,
            lecturer: lecturer || null
        });
        await course.save();
        await AuditLog.create({
            user: req.user.id,
            action: 'CREATE_COURSE',
            details: `Created course: ${name} (${code})`
        });
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create course', error: err.message });
    }
};

module.exports = { getUsers, createCourse, createDepartment, deleteUser, getCourses, assignLecturer, deleteCourse, getAuditLogs };