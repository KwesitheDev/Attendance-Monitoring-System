const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'lecturer', 'student'], required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);