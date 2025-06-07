/**
 * Directory: backend/models/
 * Description: Defines the User schema with fields for name, email, password, role, and department.
 * Department is required for students and lecturers. Passwords are hashed using bcrypt.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'lecturer', 'student'], required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: function () { return this.role === 'student' || this.role === 'lecturer'; } },
    createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);