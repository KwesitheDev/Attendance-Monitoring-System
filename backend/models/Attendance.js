const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);