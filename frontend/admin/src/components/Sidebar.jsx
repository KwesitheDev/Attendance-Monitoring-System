import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiBook,
  FiActivity,
  FiClipboard,
} from "react-icons/fi";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navItems = [
    {
      path: "/admin/admin",
      label: "Dashboard",
      icon: FiHome,
    },
    {
      path: "/admin/users",
      label: "Manage Users",
      icon: FiUsers,
    },
    {
      path: "/admin/courses",
      label: "Manage Courses",
      icon: FiBook,
    },
    {
      path: "/admin/department",
      label: "Manage Departments",
      icon: FiActivity,
    },
    {
      path: "/admin/attendance",
      label: "Audit Logs",
      icon: FiClipboard,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white">
          <h2 className="text-xl font-bold text-white">AttendanceMS</h2>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-300 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-indigo-700 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}

export default Sidebar;
