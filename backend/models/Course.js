/**
 * Directory: backend/models/
 * Description: Course model with enrollment key and students.
 */
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    year: { type: Number, required: true },
    lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrollmentPassword: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Course', courseSchema);