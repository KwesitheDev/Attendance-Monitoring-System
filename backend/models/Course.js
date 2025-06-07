/**
 * Directory: backend/models/
 * Description: Defines the Course schema with fields for name, code, department, year (1-4),
 * lecturer, students, and enrollment password. Password is hashed using bcrypt.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    year: { type: Number, enum: [1, 2, 3, 4], required: true },
    lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    enrollmentPassword: { type: String },
    createdAt: { type: Date, default: Date.now },
});

courseSchema.pre('save', async function (next) {
    if (this.isModified('enrollmentPassword')) {
        this.enrollmentPassword = await bcrypt.hash(this.enrollmentPassword, 10);
    }
    next();
});

module.exports = mongoose.model('Course', courseSchema);