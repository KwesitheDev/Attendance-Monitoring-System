/**
 * Directory: backend/controllers/
 * Description: Handles admin actions: creating users, departments, courses, and fetching audit logs.
 * Logs actions to audit logs for accountability.
 */
const User = require('../models/User');
const Department = require('../models/Department');
const Course = require('../models/Course');
const AuditLog = require('../models/AuditLog');

const createUser = async (req, res, next) => {
    const { name, email, password, role, department } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        if ((role === 'student' || role === 'lecturer') && !department) {
            return res.status(400).json({ message: 'Department is required for students and lecturers' });
        }

        if (department) {
            const deptExists = await Department.findById(department);
            if (!deptExists) return res.status(400).json({ message: 'Invalid department' });
        }

        user = new User({ name, email, password, role, department });
        await user.save();
        await AuditLog.create({ user: req.user.id, action: 'CREATE_USER', details: `Created user: ${email}` });
        res.json({ message: 'User created', user: { id: user._id, name, email, role, department } });
    } catch (error) {
        next(error);
    }
};

const createDepartment = async (req, res, next) => {
    const { name } = req.body;
    try {
        let department = await Department.findOne({ name });
        if (department) return res.status(400).json({ message: 'Department already exists' });

        department = new Department({ name });
        await department.save();
        await AuditLog.create({ user: req.user.id, action: 'CREATE_DEPARTMENT', details: `Created department: ${name}` });
        res.json({ message: 'Department created', department });
    } catch (error) {
        next(error);
    }
};

const createCourse = async (req, res, next) => {
    const { name, code, department, year, lecturer } = req.body;
    try {
        let course = await Course.findOne({ code });
        if (course) return res.status(400).json({ message: 'Course already exists' });

        const deptExists = await Department.findById(department);
        if (!deptExists) return res.status(400).json({ message: 'Invalid department' });

        const lecturerExists = await User.findOne({ _id: lecturer, role: 'lecturer' });
        if (!lecturerExists) return res.status(400).json({ message: 'Invalid lecturer' });

        if (![1, 2, 3, 4].includes(year)) return res.status(400).json({ message: 'Invalid year' });

        course = new Course({ name, code, department, year, lecturer });
        await course.save();
        await AuditLog.create({ user: req.user.id, action: 'CREATE_COURSE', details: `Created course: ${code}` });
        res.json({ message: 'Course created', course });
    } catch (error) {
        next(error);
    }
};

const getAuditLogs = async (req, res, next) => {
    try {
        const logs = await AuditLog.find().populate('user').sort({ createdAt: -1 });
        res.json(logs);
    } catch (error) {
        next(error);
    }
};

module.exports = { createUser, createDepartment, createCourse, getAuditLogs };