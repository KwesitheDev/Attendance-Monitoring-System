/**
 * Directory: backend/
 * Description: Configures the Express server, connects to MongoDB, sets up Socket.IO for real-time notifications,
 * and mounts routes for authentication, admin, lecturer, student, and analytics. Includes rate limiting and error handling.
 */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const lecturerRoutes = require('./routes/lecturer');
const studentRoutes = require('./routes/student');
const analyticsRoutes = require('./routes/analytics');
const rateLimit = require('./middleware/rateLimit');
const errorMiddleware = require('./middleware/error');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimit); // Apply rate limiting to all routes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/lecturer', lecturerRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling
app.use(errorMiddleware);

// Socket.IO for real-time notifications
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});
app.set('io', io); // Make io available to controllers

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));