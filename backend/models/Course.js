const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    enrollmentPassword: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);