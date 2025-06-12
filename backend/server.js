const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const lecturerRoutes = require('./routes/lecturer');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin'); // Added admin routes

dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://attendance-admin.netlify.app',
        'https://attendance-student.netlify.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lecturer', lecturerRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes); // Added admin routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));