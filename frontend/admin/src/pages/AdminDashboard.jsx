import { useState, useEffect } from "react";
import api from "../api/apiConfig";
import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import { FiUsers, FiBook, FiActivity, FiClock, FiCheck } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuBookOpen } from "react-icons/lu";
import { IoSchoolOutline } from "react-icons/io5";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLecturers: 0,
    activeCourses: 0,
    totalDepartments: 0,
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersRes = await api.get("/admin/users");

        // Fetch all courses
        const coursesRes = await api.get("/admin/courses");

        // Fetch departments
        const deptsRes = await api.get("/auth/departments");

        // Fetch audit logs
        const logsRes = await api.get("/admin/audit-logs");

        const allUsers = usersRes.data;
        const students = allUsers.filter((u) => u.role === "student").length;
        const lecturers = allUsers.filter((u) => u.role === "lecturer").length;
        const activeCourses = coursesRes.data.length;

        setStats({
          totalStudents: students,
          totalLecturers: lecturers,
          activeCourses: activeCourses,
          totalDepartments: deptsRes.data.length,
        });

        setLogs(logsRes.data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsData = [
    {
      title: "Total Students",
      icon: FiUsers,
      value: stats.totalStudents,
      color: "indigo",
    },
    {
      title: "Total Lecturers",
      icon: FaChalkboardTeacher,
      value: stats.totalLecturers,
      color: "blue",
    },
    {
      title: "Active Courses",
      icon: LuBookOpen,
      value: stats.activeCourses,
      color: "green",
    },
    {
      title: "Departments",
      icon: IoSchoolOutline,
      value: stats.totalDepartments,
      color: "purple",
    },
  ];

  if (loading)
    return (
      <Layout title="Dashboard" subtitle="Overview of system metrics">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin">
            <FiActivity className="text-4xl text-indigo-600" />
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout title="Dashboard" subtitle="Overview of system metrics">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiClock className="text-slate-600" size={20} />
          <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  User
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr
                    key={log._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {log.user?.name || "System"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        <FiCheck size={14} />
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {log.details || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {new Date(log.timestamp).toLocaleDateString()} at{" "}
                      {new Date(log.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-center text-sm text-slate-500"
                  >
                    No recent activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
