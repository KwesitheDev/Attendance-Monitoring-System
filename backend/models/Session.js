const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    date: { type: Date, required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);