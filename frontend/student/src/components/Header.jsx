import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <Link to="/dashboard" className="text-xl font-bold mb-2 sm:mb-0">
                    Student Dashboard
                </Link>
                {user.name && (
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <span className="text-sm">
                            {user.name} | {user.department?.name || 'N/A'} | Year {user.year || 'N/A'}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;