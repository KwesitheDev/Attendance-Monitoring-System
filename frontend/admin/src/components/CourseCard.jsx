import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuQrCode, LuKey, LuEye } from "react-icons/lu";
import Card from "./Card";

const CourseCard = ({ course }) => {
  const {
    _id,
    code = "",
    name = "",
    department = "",
    status = "",
    students = 0,
    sessions = 0,
  } = course || {};

  const navigate = useNavigate();

  const handleGenerateQR = () => {
    navigate(`/courses/${_id}/qr`);
  };

  return (
    <Card className="p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 border rounded-full text-sm">{code}</span>

          {status && (
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                status.toLowerCase() === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {status}
            </span>
          )}
        </div>

        <p className="mt-2 font-semibold text-gray-800">{name}</p>

        <div className="mt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Department</span>
            <span>{department}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Students</span>
            <span>{students}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Sessions</span>
            <span>{sessions}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleGenerateQR}
            className="flex-1 border rounded-md py-2 flex justify-center hover:bg-gray-100"
          >
            <LuQrCode />
          </button>

          <Link
            to={`/courses/${_id}/enrollment`}
            className="flex-1 border rounded-md py-2 flex justify-center hover:bg-gray-100"
          >
            <LuKey />
          </Link>

          <Link
            to={`/courses/${_id}/details`}
            className="flex-1 border rounded-md py-2 flex justify-center hover:bg-gray-100"
          >
            <LuEye />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
