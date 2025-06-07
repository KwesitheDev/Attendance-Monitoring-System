/**
 * Directory: backend/controllers/
 * Description: Handles user authentication (login, register) and department fetching for signup dropdown.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Department = require('../models/Department');

const getDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find().select('name _id');
        res.json(departments);
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    const { name, email, password, role, department } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        if (role === 'student' && !department) {
            return res.status(400).json({ message: 'Department is required for students' });
        }

        if ((role === 'student' || role === 'lecturer') && department) {
            const deptExists = await Department.findById(department);
            if (!deptExists) return res.status(400).json({ message: 'Invalid department' });
        }

        user = new User({ name, email, password, role, department });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name, email, role, department } });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate('department');
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, email, role: user.role, department: user.department } });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDepartments, register, login };