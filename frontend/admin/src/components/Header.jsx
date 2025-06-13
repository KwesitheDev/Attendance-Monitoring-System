import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Attendance System</h1>
                <nav className="flex space-x-4">
                    {role === 'admin' ? (
                        <>
                            <Link to="/admin/admin" className="hover:underline">Dashboard</Link>
                            <Link to="/admin/users" className="hover:underline">Users</Link>
                            <Link to="/admin/department" className="hover:underline">Departments</Link>
                            <Link to="/admin/courses" className="hover:underline">Courses</Link>
                            <Link to="/admin/attendance" className="hover:underline">Audit Logs</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                        </>
                    )}
                    <button onClick={handleLogout} className="hover:underline">Logout</button>
                </nav>
            </div>
        </header>
    );
}

export default Header;