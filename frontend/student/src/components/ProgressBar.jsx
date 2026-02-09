import React from "react";

const ProgressBar = ({ current, total }) => {
  const percentage =
    current && total > 0 ? ((current / total) * 100).toFixed(2) : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-indigo-500 h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
