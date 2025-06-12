const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Department = require('../models/Department');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.error('MongoDB connection error:', err));

const seed = async () => {
    try {
        await User.deleteMany({});
        await Department.deleteMany({});

        const compSci = new Department({
            name: 'Computer Science',
            code: 'CS'
        });
        await compSci.save();

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: 'Admin User',
            code: 'ADM001',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
            department: compSci._id
        });
        await admin.save();

        const lecturerHashedPassword = await bcrypt.hash('lecturer123', 10);
        const lecturer = new User({
            name: 'Lecturer User',
            code: 'LEC001',
            email: 'lecturer@example.com',
            password: lecturerHashedPassword,
            role: 'lecturer',
            department: compSci._id
        });
        await lecturer.save();

        const studentHashedPassword = await bcrypt.hash('student123', 10);
        const student = new User({
            name: 'Student User',
            code: 'STU001',
            email: 'student@example.com',
            password: studentHashedPassword,
            role: 'student',
            department: compSci._id
        });
        await student.save();

        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seed();