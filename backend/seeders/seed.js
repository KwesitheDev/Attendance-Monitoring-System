const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Department = require('../models/Department');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.log(err));

const seed = async () => {
    try {
        await User.deleteMany();
        await Department.deleteMany();

        const department = new Department({
            name: 'Computer Science',
            code: 'CS'
        });
        await department.save();

        const users = [
            {
                name: 'Admin User',
                code: 'ADM001',
                email: 'admin@example.com',
                password: await bcrypt.hash('admin123', 10),
                role: 'admin',
                department: department._id
            },
            {
                name: 'Lecturer User',
                code: 'LEC001',
                email: 'lecturer@example.com',
                password: await bcrypt.hash('lecturer123', 10),
                role: 'lecturer',
                department: department._id
            },
            {
                name: 'Student User',
                code: 'STU001',
                email: 'student@example.com',
                password: await bcrypt.hash('student123', 10),
                role: 'student',
                department: department._id
            }
        ];

        await User.insertMany(users);
        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seed();