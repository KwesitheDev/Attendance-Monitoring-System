import React from "react";

const Input = ({
  label,
  placeholder,
  type,
  name,
  value,
  className = "",
  inputClassName = "",
  ...props
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        {...props}
        className={`
          w-full p-1 px-2 border rounded-md 
          focus:outline-none focus:border-transparent
          focus:ring-2 focus:ring-blue-600 
          border-none bg-gray-100 text-sm
          ${inputClassName}
          `}
      />
    </div>
  );
};

export default Input;
