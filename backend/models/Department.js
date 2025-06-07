/**
 * Directory: backend/models/
 * Description: Defines the Department schema with a unique name field.
 */
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Department', departmentSchema);