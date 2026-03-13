# Attendance Monitoring System

## 🔍 Overview

The **Attendance Monitoring System** is a full-stack web application that enables educational institutions to track attendance using QR codes.

There are three user roles:

- **Admin**: Manages users, departments, courses, and audit logs.
- **Lecturer**: Creates courses, generates QR codes for attendance sessions, and views course attendance.
- **Student**: Enrolls in courses, scans QR codes to mark attendance, and views attendance history.

---

## 🧩 Technology Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Winston
- **Frontend**: React, Tailwind CSS, Axios, React Router
- **QR Support**: `html5-qrcode` (student scanner), `qrcode.react` (admin/lecturer generator)

---

## 📁 Project Structure

```
Attendance-Monitoring-System/
├── backend/                     # API server
│   ├── controllers/             # Business logic
│   ├── middlewares/             # Auth, error handling
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # Express routes
│   ├── seeders/                 # Seed script (seed.js)
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── admin/                   # Admin + Lecturer UI (CRA)
│   └── student/                 # Student UI (Vite)
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### 1) Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
PORT=5000
```

Seed the database (creates demo departments, users, courses, sessions, and attendance records):

```bash
npm run seed
```

Start the backend server:

```bash
npm start
# or
node server.js
```

✅ Default backend URL: `http://localhost:5000`

---

### 2) Frontend Setup (Admin + Student)

Each frontend runs separately. Open two terminals (or adjust ports).

#### Admin / Lecturer UI

```bash
cd frontend/admin
npm install
npm start
```

✅ Default URL: `http://localhost:3000`

#### Student UI

```bash
cd frontend/student
npm install
npm start
```

✅ Default URL: `http://localhost:3000` (if port conflicts, run with `PORT=3001 npm start`)

---

## 🧠 Seed Accounts (Demo Credentials)

| Role      | Email                   | Password    |
|-----------|-------------------------|-------------|
| Admin     | `admin@example.com`     | `admin123`  |
| Lecturer  | `lecturer@example.com`  | `lecturer123` |
| Student   | `student@example.com`   | `student123` |

---

## 🧭 API Endpoints (Key Routes)

### Auth
- `POST /api/auth/login` — Login (email + password)
- `GET /api/auth/departments` — Fetch departments list

### Admin (Requires `admin` role)
- `GET /api/admin/users` — List users
- `POST /api/admin/users` — Create user
- `DELETE /api/admin/users/:id` — Delete user
- `GET /api/admin/departments` — List departments
- `POST /api/admin/departments` — Create department
- `GET /api/admin/courses` — List courses
- `POST /api/admin/courses` — Create course
- `GET /api/admin/audit-logs` — Fetch audit logs

### Lecturer (Requires `lecturer` role)
- `GET /api/lecturer/courses` — List lecturer courses
- `POST /api/lecturer/courses/:id/generate-qr` — Create attendance session and QR data
- `GET /api/lecturer/courses/:id/attendance` — View attendance for a course

### Student (Requires `student` role)
- `GET /api/student/courses` — List enrolled courses + attendance stats
- `POST /api/student/enroll` — Enroll in a course (courseCode + enrollmentKey)
- `POST /api/student/attendance` — Mark attendance (QR scan)

> All protected routes require an `Authorization: Bearer <token>` header.

---

## ✅ Features

### Admin
- Create/manage users, departments, and courses
- View audit logs and system activity

### Lecturer
- Create and manage courses and sessions
- Generate QR codes to capture attendance
- View attendance stats and student participation

### Student
- Enroll in courses using course codes + keys
- Scan QR codes to mark attendance
- View list of enrolled courses and attendance %

---

## 🧪 Running Tests & Common Development Tasks

### Local URLs
- Backend: `http://localhost:5000`
- Admin UI: `http://localhost:3000`
- Student UI: `http://localhost:3000`

### Useful commands

**Backend**
- `npm run seed` — Reset seed data
- `npm start` — Run backend API

**Admin UI**
- `npm start` — Run admin frontend
- `npm run build` — Build for production

**Student UI**
- `npm start` — Run student frontend
- `npm run build` — Build for production

---

## 🛠️ Deployment

- **Backend**: Render
- **Admin / Lecturer UI**: Netlify
- **Student UI**: Netlify

---

## Notes

- The app uses JWT stored in `localStorage` for session persistence.
- Attendance percentages and session stats are computed server-side.
- When testing with Postman, include a valid token in the Authorization header.
