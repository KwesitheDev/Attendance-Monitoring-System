import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                    to="/admin/users"
                    className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600"
                >
                    Manage Users
                </Link>
                <Link
                    to="/admin/department"
                    className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600"
                >
                    Manage Departments
                </Link>
                <Link
                    to="/admin/courses"
                    className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600"
                >
                    Manage Courses
                </Link>
                <Link
                    to="/admin/attendance"
                    className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600"
                >
                    View Audit Logs
                </Link>
            </div>
        </div>
    );
}

export default AdminDashboard;