import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <div
      className={`text-3xl font-bold text-white bg-indigo-500 px-6 py-4 rounded-2xl ${className}`}
    >
      A
    </div>
  );
};

export default Logo;
