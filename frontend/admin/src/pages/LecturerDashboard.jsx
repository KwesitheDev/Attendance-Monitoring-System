import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/Lecturer";
import Card from "../components/Card";
import lecturerData from "../data/lecturerData";
import { LuBookOpen, LuUsers, LuCalendar } from "react-icons/lu";

function LecturerDashboard() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  console.log(lecturerData.courses);

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

  const handleGenerateQR = (courseId) => {
    window.open(`/courses/${courseId}/qr`, "_blank");
  };

  return (
    <div className="container mx-auto p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}{" "}
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-1 text-gray-800">
          Welcome back, {user.name}
        </h2>
        <p className="text-gray-600 text-sm">
          Manage courses and track attendance
        </p>
      </div>
      {/*Quick Info Cards */}
      <div className="grid gap-6 mb-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <Card>
          <div>
            <h2 className="text-gray-400 mb-4 flex justify-between items-center">
              Active Courses
              <span>
                <LuBookOpen className=" -mt-0.5" />{" "}
              </span>
            </h2>
            <p className="text-xl font-semibold">{lecturerData.courses}</p>
            <p className="text-sm text-gray-500">Teaching this semester</p>
          </div>
        </Card>
        <Card>
          <div>
            <h2 className="text-gray-400 mb-4 flex justify-between items-center">
              Total Students
              <span>
                <LuUsers className=" -mt-0.5" />{" "}
              </span>
            </h2>
            <p className="text-xl font-semibold">{lecturerData.students}</p>
            <p className="text-sm text-gray-500">Across all courses</p>
          </div>
        </Card>
        <Card>
          <div>
            <h2 className="text-gray-400 mb-4 flex justify-between items-center">
              Sessions today
              <span>
                <LuCalendar className=" -mt-0.5" />{" "}
              </span>
            </h2>
            <p className="text-xl font-semibold">
              {lecturerData.sessionsToday}
            </p>
            <p className="text-sm text-gray-500">Scheduled for today</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LecturerDashboard;
