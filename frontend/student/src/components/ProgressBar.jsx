import React from "react";

const ProgressBar = ({ current, total, className = "", innerClass = "" }) => {
  const percentage =
    current && total > 0 ? ((current / total) * 100).toFixed(2) : 0;

  return (
    <div className={`w-full bg-gray-200 rounded-full ${className} `}>
      <div
        className={`bg-indigo-500 rounded-full ${innerClass} `}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
