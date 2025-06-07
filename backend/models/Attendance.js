/**
 * Directory: backend/models/
 * Description: Defines the Attendance schema to track student attendance for sessions and courses.
 */
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', attendanceSchema);