import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { LuLogOut } from "react-icons/lu";

function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className=" p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold mb-2 sm:mb-0">
          <div className="flex justify-center items-center gap-2 -ml-4">
            <Logo className="px-3 py-1.5 text-lg  font-semibold " />
            AttendanceMS
          </div>
        </Link>
        {user.name && (
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-sm">
              {user.name} | {user.department?.name || "N/A"}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border-indigo-400 transition-colors border px-2 py-1 rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Sign Out
              <LuLogOut className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
