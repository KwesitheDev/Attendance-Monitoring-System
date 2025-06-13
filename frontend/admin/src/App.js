import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageDepartments from './pages/ManageDepartments';
import ManageCourses from './pages/ManageCourses';
import AuditLogs from './pages/AuditLogs';
import LecturerDashboard from './pages/LecturerDashboard';
import CreateCourse from './pages/CreateCourse';
import GenerateQR from './pages/GenerateQR';
import SetEnrollmentKey from './pages/SetEnrollmentKey';
import ViewAttendance from './pages/ViewAttendance';
import Header from './components/Header';

function Main() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const location = useLocation(); // Moved to child component

    const ProtectedRoute = ({ children, allowedRoles }) => {
        if (!token || !allowedRoles.includes(role)) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {token && location.pathname !== '/login' && <Header />} {/* Hide Header on login page */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin/admin"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManageUsers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/department"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManageDepartments />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/courses"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManageCourses />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/attendance"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AuditLogs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['lecturer']}>
                            <LecturerDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/courses/create"
                    element={
                        <ProtectedRoute allowedRoles={['lecturer']}>
                            <CreateCourse />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/courses/:courseId/qr"
                    element={
                        <ProtectedRoute allowedRoles={['lecturer']}>
                            <GenerateQR />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/courses/:courseId/enrollment"
                    element={
                        <ProtectedRoute allowedRoles={['lecturer']}>
                            <SetEnrollmentKey />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/courses/:courseId/attendance"
                    element={
                        <ProtectedRoute allowedRoles={['lecturer']}>
                            <ViewAttendance />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

export default App;