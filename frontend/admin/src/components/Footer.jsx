import React from "react";

const Footer = () => {
  return (
    <div className="w-full py-6 mt-auto bg-gradient-to-r from-violet-50 to-white ">
      <p className=" text-gray-500 text-center text-sm  ">
        &copy; {new Date().getFullYear()} AttendanceMS. All rights reserved
        (KwesiTheDev).
      </p>
    </div>
  );
};

export default Footer;
