/**
 * Directory: backend/models/
 * Description: Session model for QR code generation and class sessions.
 */
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    qrCode: { type: String, required: true }, // Stores QR code data (e.g., JSON string)
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }, // QR code expiration
});

module.exports = mongoose.model('Session', sessionSchema);