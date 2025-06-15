# Attendance Monitoring System

## Overview

The Attendance Monitoring System is a web-based application designed to streamline course attendance in educational institutions. It supports three user roles:
- **Admin**: Manages users, departments, and courses.
- **Lecturer**: Generates QR codes for attendance and manages course enrollment.
- **Student**: Enrolls in courses and scans QR codes to mark attendance.

---

## Technology Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, winston, express-async-handler
- **Frontend**: React, Tailwind CSS, axios, react-router-dom, html5-qrcode (for students), qrcode.react (for admin/lecturer)
- **Deployment**: Render (backend), Netlify (frontends)

---

## Project Structure

Attendance-Monitoring-System/
├── backend/
│ ├── controllers/
│ │ ├── auth.js
│ │ ├── admin.js
│ │ ├── lecturer.js
│ │ └── student.js
│ ├── middlewares/
│ │ └── auth.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Course.js
│ │ ├── Department.js
│ │ ├── Session.js
│ │ ├── Attendance.js
│ │ └── AuditLog.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── admin.js
│ │ ├── lecturer.js
│ │ └── student.js
│ ├── seeders/
│ │ └── seed.js
│ ├── .env
│ ├── package.json
│ └── server.js
├── frontend/
│ ├── admin/
│ │ ├── src/
│ │ │ ├── api/
│ │ │ │ ├── apiConfig.js
│ │ │ │ ├── Auth.js
│ │ │ │ └── Lecturer.js
│ │ │ ├── components/
│ │ │ │ └── Header.jsx
│ │ │ ├── pages/
│ │ │ │ ├── Login.jsx
│ │ │ │ ├── AdminDashboard.jsx
│ │ │ │ ├── ManageUsers.jsx
│ │ │ │ ├── ManageDepartments.jsx
│ │ │ │ ├── ManageCourses.jsx
│ │ │ │ ├── AuditLogs.jsx
│ │ │ │ ├── LecturerDashboard.jsx
│ │ │ │ ├── CreateCourse.jsx
│ │ │ │ ├── GenerateQR.jsx
│ │ │ │ ├── SetEnrollmentKey.jsx
│ │ │ │ └── ViewAttendance.jsx
│ │ │ ├── App.js
│ │ │ ├── tailwind.css
│ │ │ └── index.js
│ │ ├── public/
│ │ │ └── index.html
│ │ ├── netlify.toml
│ │ ├── package.json
│ │ └── tailwind.config.js
│ └── student/
│ ├── src/
│ │ ├── api/
│ │ │ └── Student.js
│ │ ├── components/
│ │ │ └── Header.jsx
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── StudentDashboard.jsx
│ │ │ ├── EnrollCourse.jsx
│ │ │ └── ScanQR.jsx
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── index.js
│ ├── .env
│ ├── package.json
│ └── tailwind.config.js


---

## Setup Instructions

### Backend

1. Navigate to `backend/`:


2. Install dependencies:

3. Create .env:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000

4. Seed database:
npm run seed


5. Start server:
node server.js


**Deployed at**: https://attendance-monitoring-system-ct6t.onrender.com

---

### Frontend (Admin/Lecturer, Student)

For each frontend (admin/, student/):

1. Navigate to the directory:

cd frontend/<role>


2. Install dependencies:
npm install


3. Start development server:
npm start


4. Build for production:
npm run build



**Deployed at**:  
- Admin/Lecturer: https://attendance-admin.netlify.app  
- Student: https://attendance-student.netlify.app

---

## Features

### Admin
- Manage users (list, search, sort, delete)
- Manage departments (create, search)
- Manage courses (create, assign lecturers, delete)
- View audit logs

### Lecturer
- List courses with aesthetic cards
- Generate QR codes for attendance (new tab with course details)
- Set enrollment keys
- View attendance

### Student
- Enroll in courses with course code and enrollment key
- Scan QR codes to mark attendance
- View enrolled courses
- Header displays name, department, year

---

## Testing

### Local

- Backend: http://localhost:5000
- Admin/Lecturer: http://localhost:3000
- Student: http://localhost:3000

### Use seed credentials:
- Admin: `admin@example.com`, `admin123`
- Lecturer: `lecturer@example.com`, `lecturer123`
- Student: `student@example.com`, `student123`

---

### End-to-End:
1. Admin creates course  
2. Lecturer generates QR code  
3. Student enrolls and scans QR

---

### Postman:
Test endpoints like:
- `/api/auth/login`
- `/api/student/enroll`
- `/api/lecturer/qr-code`

---

## Deployment

- **Backend**: Render  
https://attendance-monitoring-system-ct6t.onrender.com
- **Admin/Lecturer**: Netlify  
https://attendance-admin.netlify.app
- **Student**: Netlify  
https://attendance-student.netlify.app

---

## Notes

- Mobile-responsive UI with Tailwind CSS
- JWT authentication with localStorage
- QR scanning uses `html5-qrcode` (student)
- QR generation uses `qrcode.react` (admin/lecturer)
- Source map warnings in `html5-qrcode` are harmless and do not affect functionality
