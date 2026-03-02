import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { LuDownload } from "react-icons/lu";

const DetailedCoursePage = () => {
  return (
    <div className="container mx-auto p-6">
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
    </div>
  );
};

export default DetailedCoursePage;
