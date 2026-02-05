import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/Student";
import Card from "../components/Card";
//TODO: Add complementary icons on cards and other places for better UI/UX

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="mx-auto p-6 max-w-7xl ">
      <Card className="bg-white p-10 rounded-lg w-full max-w-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
        <div>
          <h1
            className="
            text-2xl font-semibold mb-4 
        "
          >
            {user ? ` ${user.name}` : "Welcome to the Student Dashboard!"}
          </h1>
          <p className="text-gray-500">
            {user.department
              ? `Department: ${user.department.name}`
              : "No department assigned"}{" "}
            • Year {user.year || "N/A"}
          </p>
        </div>
        <Link
          to="/enroll"
          className="bg-violet-500 text-white
    px-6 py-3
    rounded-md
    font-medium
    hover:bg-violet-600
    focus:outline-none focus:ring-2 focus:ring-violet-400
    whitespace-nowrap"
        >
          Enroll in Course
        </Link>
      </Card>

      <div
        className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6
      "
      >
        <Card>
          <div>
            <h2 className="text-lg text-gray-400 mb-4">Enrolled Courses</h2>
            <p className="text-3xl font-bold">{courses.length}</p>
            <p className="text-sm text-gray-500">This semester</p>
          </div>
          <div></div>
        </Card>
        <Card>
          <div>
            <h2 className="text-lg text-gray-400 mb-4">Attendance Rate</h2>
            {/**TODO: replace with real user attendance rate from backend later. */}
            <p className="text-3xl font-bold text-green-400">80%</p>
            <p className="text-sm text-gray-500">This semester</p>
          </div>
          <div></div>
        </Card>
        <Card>
          <div>
            <h2 className="text-lg text-gray-400 mb-4">Enrolled Courses</h2>
            <p className="text-3xl font-bold">{courses.length}</p>
            <p className="text-sm text-gray-500">This semester</p>
          </div>
          <div></div>
        </Card>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Courses</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Link
          to="/scan"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Scan QR Code
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {course.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Code: {course.code}</p>
            <p className="text-sm text-gray-600 mb-2">Year: {course.year}</p>
            <p className="text-sm text-gray-600 mb-4">
              Department: {course.department?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Lecturer: {course.lecturer?.name || "Unassigned"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;
