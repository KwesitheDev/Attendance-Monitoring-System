import React from "react";
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { LuDownload, LuFilter, LuArrowLeft, LuCalendar } from "react-icons/lu";

const DetailedCoursePage = () => {
  const navigate = useNavigate();
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
            CS201
          </span>

          <span className="px-2 py-1 rounded-full text-sm text-green-800 bg-green-100">
            Active
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col mt-2 mb-4 ">
            <span className="font-medium mb-1">Database System</span>
            <span className="text-gray-600">Computer Science</span>
          </div>
          <div>
            <Link className="flex items-center  gap-2 border border-gray-300 p-2 rounded-md">
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
            <span className="font-semibold text-2xl">24</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Enrolled Students</span>
            <span className="font-semibold text-2xl">40</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Attendance Rate</span>
            <span className="font-semibold text-2xl text-green-500">80%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm"> Sessions Held</span>
            <span className="font-semibold text-2xl">18</span>
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
            <LuCalendar className="w-8 h-8 text-gray-500" />
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
