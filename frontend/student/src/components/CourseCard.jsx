import React from "react";
import Card from "./Card";
import ProgressBar from "./ProgressBar";

const CourseCard = ({ course }) => {
  return (
    <Card className="p-4 flex flex-col justify-between">
      <div>
        <p className="inline-block border text-sm border-gray-200 px-3 py-1 rounded-2xl">
          {course.code}
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4 text-gray-800">
          {course.name}
        </h3>
        <div>
          <div className="flex  justify-between">
            <p className="text-gray-500">Lecturer</p>
            <p className="font-medium text-gray-600">{course.lecturer}</p>
          </div>
          <div className="flex  justify-between">
            <p className="text-gray-500">Department</p>
            <p className="font-medium text-gray-600">{course.department}</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between mb-2">
          <p className="text-gray-500">Attendance</p>
          <p className="font-medium text-green-500">
            {course.attendancePercentage}%
          </p>
        </div>
        <ProgressBar
          className="h-2"
          innerClass="h-2"
          current={course.attendedClasses}
          total={course.totalClasses}
        />
      </div>
    </Card>
  );
};

export default CourseCard;
