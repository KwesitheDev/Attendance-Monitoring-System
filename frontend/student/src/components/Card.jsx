import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`
        bg-white p-6 rounded-2xl 
         w-full max-w-sm border border-violet-200
        ${className}
        `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
