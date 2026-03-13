import { useState, useEffect } from "react";
import { getCourses } from "../api/Lecturer";
import StatsCard from "../components/StatsCard";
import CourseCard from "../components/CourseCard";
import { LuBookOpen, LuUsers, LuCalendar } from "react-icons/lu";

function LecturerDashboard() {
  // courses will either come from backend or fall back to dummy data
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        if (Array.isArray(data) && data.length) {
          setCourses(data);
        } else {
          setCourses([]);
        }
      } catch (err) {
        setError("Failed to load courses");
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError("");
      }, 5000);
  });

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
        <StatsCard
          title="Active Courses"
          icon={LuBookOpen}
          value={courses.length}
          subtitle="Teaching this semester"
        />
        <StatsCard
          title="Total Students"
          icon={LuUsers}
          value={
            courses.length
              ? courses.reduce((sum, c) => sum + (c.students || 0), 0)
              : 0
          }
          subtitle="Across all courses"
        />
        <StatsCard
          title="Sessions today"
          icon={LuCalendar}
          value={0}
          subtitle="Scheduled for today"
        />
      </div>
      {/*Courses Cards  */}
      <div className="grid gap-6 grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course._id || course.code} course={course} />
        ))}
      </div>
    </div>
  );
}
//TODO: fetch data from Backend to fill cards
//TODO: move Course Cards to separate component and fetch dat from backend.
//TODO:  AddCOurses functionality for lecturer's with Admin's approval

export default LecturerDashboard;
