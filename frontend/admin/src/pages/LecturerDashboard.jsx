import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/Lecturer";
import Card from "../components/Card";
import lecturerData from "../data/lecturerData";
import {
  LuBookOpen,
  LuUsers,
  LuCalendar,
  LuQrCode,
  LuKey,
  LuEye,
} from "react-icons/lu";

function LecturerDashboard() {
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
            <h2 className="text-gray-400 mb-4 flex text-sm justify-between items-center">
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
            <h2 className="text-gray-400 text-sm mb-4 flex justify-between items-center">
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
            <h2 className="text-gray-400 text-sm mb-4 flex justify-between items-center">
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
      {/*Courses Cards  */}
      <div>
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 border border-gray-400 rounded-full text-sm text-gray-500">
                CS201
              </span>

              <span className="px-2 py-1 rounded-full text-sm text-green-800 bg-green-100">
                Active
              </span>
            </div>

            <p className="mt-2 text-gray-800">Introduction To Programming</p>
            <div className="mt-4 text-sm flex gap-3 flex-col mb-4">
              <div className="flex  justify-between">
                <p className="text-gray-500">Department</p>
                <p className="font-medium text-gray-800">Computer Science</p>
              </div>
              <div className="flex  justify-between">
                <p className="text-gray-500">Students</p>
                <p className="font-medium text-gray-800">120</p>
              </div>
              <div className="flex  justify-between">
                <p className="text-gray-500">Sessions</p>
                <p className="font-medium text-gray-800">24</p>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <button className="flex-1 border hover:bg-slate-100 hover:animate-pulse border-gray-400 rounded-md py-2 flex items-center justify-center">
                <LuQrCode />
              </button>
              <button className="flex-1 border border-gray-400 hover:bg-slate-100 hover:animate-pulse rounded-md py-2 flex items-center justify-center">
                <LuKey />
              </button>
              <button className="flex-1 border hover:bg-slate-100 hover:animate-pulse border-gray-400 rounded-md py-2 flex items-center justify-center">
                <LuEye />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
//TODO: fetch data from Backend to fill cards
//TODO: move Course Cards to separate component and fetch dat from backend.
//TODO:  AddCOurses functionality for lecturer's with Admin's approval

export default LecturerDashboard;
