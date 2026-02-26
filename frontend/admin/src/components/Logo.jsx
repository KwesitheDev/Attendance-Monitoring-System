import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <div
      className={`inline-flex items-center justify-center font-bold text-white bg-indigo-500 rounded-xl ${className}`}
    >
      A
    </div>
  );
};

export default Logo;
