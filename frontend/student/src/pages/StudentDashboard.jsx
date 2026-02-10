import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/Student";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import { IoBookOutline, IoCalendar } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { Calendar } from "lucide-react";
import CourseCard from "../components/CourseCard";

//TODO: Add complementary icons on cards and other places for better UI/UX

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  //Dummy Course Data
  const dummyCourses = [
    {
      id: 1,
      code: "CSC 201",
      name: "Data Structures",
      lecturer: "Dr. John Doe",
      department: "Computer Science",
      attendancePercentage: 82,
      attendedClasses: 23,
      totalClasses: 28,
    },
    {
      id: 2,
      code: "MTH 203",
      name: "Linear Algebra",
      lecturer: "Prof. Jane Smith",
      department: "Mathematics",
      attendancePercentage: 75,
      attendedClasses: 18,
      totalClasses: 24,
    },
    {
      id: 3,
      code: "PHY 205",
      name: "Electromagnetism",
      lecturer: "Dr. Alex Brown",
      department: "Physics",
      attendancePercentage: 90,
      attendedClasses: 27,
      totalClasses: 30,
    },
  ];

  const data = {
    current: 17,
    total: 50,
  };
  const attendancePercentage = ((data.current / data.total) * 100).toFixed(1);

  const percentageColor =
    attendancePercentage > 70 ? "text-green-500" : "text-red-600";

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
      {/** Student Info Section && ENroll Button */}

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
          className="bg-indigo-700 text-white text-center
    px-3 py-2
    rounded-md
    
    hover:bg-indigo-600
    focus:outline-none focus:ring-2 focus:ring-indigo-500
    whitespace-nowrap flex items-center "
        >
          <span className="">
            <GoPlus className="text-xl -mb-1" />
            {"  "}
          </span>
          Enroll in Course
        </Link>
      </Card>

      {/**Quick Info Section */}

      <div
        className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6
      "
      >
        <Card>
          <div>
            <h2 className="text-gray-400 mb-4 flex justify-between items-center">
              Enrolled Courses
              <span>
                <IoBookOutline className="text-xl -mb-1" />{" "}
              </span>
            </h2>
            <p className="text-3xl font-bold">{courses.length}</p>
            <p className="text-sm text-gray-500">This semester</p>
          </div>
          <div></div>
        </Card>

        {/**Attendance Rate */}
        <Card>
          <div>
            <h2 className=" text-gray-400 mb-4 flex justify-between items-center">
              Attendance Rate
              <span>
                <IoIosTrendingUp className="text-xl -mb-1" />{" "}
              </span>
            </h2>
            {/**TODO: replace with real user attendance rate from backend later. */}
            <p className="text-3xl font-bold text-green-500">80%</p>
            <p className="text-sm text-gray-500">This semester</p>
          </div>
          <div></div>
        </Card>

        {/**Next Class Card */}
        <Card>
          <div>
            <h2 className=" text-gray-400 mb-4 flex justify-between items-center">
              Next Class
              <span>
                <MdAccessTime className="text-xl -mt-1.5" />
              </span>
            </h2>
            <p className="text-3xl font-bold">2:00 PM</p>
            <p className="text-sm text-gray-500">Calculus</p>
          </div>
          <div></div>
        </Card>
      </div>

      {/** Attendance Overview Card */}

      <Card>
        <div>
          <h1 className="text-lg ">Overall Attendance</h1>
          <p
            className={`font-semibold text-right pb-2 ${percentageColor}`}
          >{`${attendancePercentage} %`}</p>
          <ProgressBar current={data.current} total={data.total} />
        </div>
      </Card>

      {/** My Courses Section */}

      <div className="pt-2 pb-1 flex items-center justify-between mb-4 mt-6 align-center">
        <h2 className="text-xl font-semibold  text-gray-800">My Courses</h2>
        <Link className="px-2 py-1 rounded-md hover:bg-gray-300 hover:cursor-default ">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {dummyCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/**Quick Actions  */}

      <Card className="flex flex-col gap-3">
        <p className="font-medium text-lg">Quick actions</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Action Card */}
          <Link
            to="/scan"
            className="flex items-center gap-4 p-4 border border-indigo-100 rounded-md cursor-pointer hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-100">
              <Calendar className="text-indigo-500 text-2xl" />
            </div>

            <div>
              <div className="font-semibold text-gray-900">Scan QR Code</div>
              <div className="text-sm text-gray-500">
                Mark attendance for today’s class
              </div>
            </div>
          </Link>

          {/* Action Card */}
          <div className="flex items-center gap-4 p-4 border border-indigo-100 rounded-md cursor-pointer hover:bg-indigo-50 transition-colors">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-100">
              <IoBookOutline className="text-indigo-500 text-2xl" />
            </div>

            <div>
              <div className="font-semibold text-gray-900">
                View All Courses
              </div>
              <div className="text-sm text-gray-500">
                See detailed course information
              </div>
            </div>
          </div>
        </div>
      </Card>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
