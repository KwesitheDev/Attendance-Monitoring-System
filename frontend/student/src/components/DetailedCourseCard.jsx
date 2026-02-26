import Card from "./Card";
import ProgressBar from "./ProgressBar";
import { LuUser, LuTrendingUp, LuCalendar, LuBookOpen } from "react-icons/lu";

const DetailedCourseCard = ({ course }) => {
  if (!course) return null;

  const percentage = course.attendancePercentage;

  const getStatus = () => {
    if (percentage >= 75)
      return { label: "Good Standing", color: "text-green-600 bg-green-50" };
    if (percentage >= 50)
      return { label: "Warning", color: "text-yellow-600 bg-yellow-50" };
    return { label: "Critical", color: "text-red-600 bg-red-50" };
  };

  const status = getStatus();

  return (
    <Card className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm inline-block border border-gray-200 px-3 py-1 rounded-2xl">
            {course.code}
          </p>
          <h2 className="text-2xl font-medium text-gray-800">{course.name}</h2>
          <div className="flex gap-4 items-center text-sm text-gray-600 mt-2">
            <div className="flex items-center gap-1">
              <LuBookOpen className="w-4 h-4" />
              <span>{course.department}</span>
            </div>

            <div className="flex items-center gap-1">
              <LuUser className="w-4 h-4" />
              <span>{course.lecturer.name}</span>
            </div>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md">
        <div>
          <p className="text-sm text-gray-500">Days</p>
          <p className="font-medium">{course.schedule.days.join(", ")}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Time</p>
          <p className="font-medium">{course.schedule.time}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Venue</p>
          <p className="font-medium">{course.schedule.venue}</p>
        </div>
      </div>

      {/* Attendance + Statistics */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Attendance Overview */}
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <p className="font-medium">
              <LuTrendingUp className="inline-block mr-1 text-indigo-500 -mt-0.5" />
              Attendance Progress
            </p>
            <p className="font-bold text-indigo-600">{percentage}%</p>
          </div>

          <ProgressBar
            className="h-3"
            innerClass="h-3"
            current={course.attendedClasses}
            total={course.totalClasses}
          />

          <div className="flex justify-between mt-3 text-sm text-gray-600">
            <p>Present: {course.attendedClasses}</p>
            <p>Missed: {course.missedClasses}</p>
          </div>
        </div>

        {/* Course Statistics */}
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-4">
            <LuCalendar className="w-4 h-4 text-indigo-500" />
            <span className="font-medium">Course Statistics</span>
          </div>

          <div className="grid grid-cols-2 gap-6 ">
            <div>
              <p className="text-sm text-gray-500">Present</p>
              <p className=" font-semibold text-green-600">
                {course.attendedClasses}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Absent</p>
              <p className=" font-semibold text-red-600">
                {course.missedClasses}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Sessions</p>
              <p className=" font-semibold text-gray-800">
                {course.totalClasses}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Remaining</p>
              <p className=" font-semibold">
                {course.totalClasses -
                  course.attendedClasses -
                  course.missedClasses}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DetailedCourseCard;
