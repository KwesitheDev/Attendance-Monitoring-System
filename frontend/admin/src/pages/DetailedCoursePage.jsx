import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuDownload, LuFilter, LuArrowLeft, LuCalendar } from "react-icons/lu";
import { getCourses } from "../api/Lecturer";

const DetailedCoursePage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCourses();
        let found = null;
        if (Array.isArray(data)) {
          found = data.find((c) => c._id === courseId || c.code === courseId);
        }
        if (found) {
          setCourse(found);
        } else {
          setCourse(null);
        }
      } catch (err) {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [courseId]);

  // derived display values from course object
  const {
    code = "",
    name = "",
    department = "",
    status = "",
    students = 0,
    sessions = 0,
    attendanceRate = "-",
    sessionsHeld = "-",
  } = course || {};

  return (
    <div className="container mx-auto p-6 flex flex-col gap-6">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2  cursor-pointer hover:text-indigo-700 transition w-fit"
      >
        <LuArrowLeft className="text-lg" />
        <span className="font-medium">Back</span>
      </div>

      <Card className="p-8">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 border border-gray-400 rounded-full text-sm text-gray-500">
            {code}
          </span>

          <span
            className={`px-2 py-1 rounded-full text-sm ${
              status.toLowerCase() === "active"
                ? "text-green-800 bg-green-100"
                : "text-gray-500 bg-gray-100"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col mt-2 mb-4 ">
            <span className="font-medium mb-1">{name}</span>
            <span className="text-gray-600">{department}</span>
          </div>
          <div>
            <Link className="flex items-center  gap-2 border border-gray-300 p-2 rounded-md focus:ring-2  focus:ring-indigo-600 transition-colors">
              <span>
                <LuDownload className="hover:animate-pulse" />
              </span>
              Export Report
            </Link>
          </div>
        </div>

        <div className="flex gap-40">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Total Session</span>
            <span className="font-semibold text-2xl">{sessions}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Enrolled Students</span>
            <span className="font-semibold text-2xl">{students}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Attendance Rate</span>
            <span className="font-semibold text-2xl text-green-500">
              {attendanceRate}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm"> Sessions Held</span>
            <span className="font-semibold text-2xl">{sessionsHeld}</span>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <div className="flex  justify-between">
          <span>Attendance Records</span>
          <div className="flex items-center gap-2">
            <LuFilter className="text-gray-600 text-lg" />
            <select
              value={"All Sessions"}
              id=""
              className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="name">Sessions</option>
              <option value="">Another Session</option>
            </select>
          </div>
        </div>
        <div className="flex-col flex gap-2 items-center mt-10">
          <span className="p-8">
            <LuCalendar className="w-10 h-10 text-gray-500" />
          </span>

          <p className="text-lg">No attendance records</p>

          <p className="text-sm text-gray-500">
            Attendance records will show here once sessions are conducted
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DetailedCoursePage;
