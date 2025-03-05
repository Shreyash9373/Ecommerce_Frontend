import React from "react";

const FormInput = ({ className, type = "text", ...props }) => {
  return (
    <input
      className={`padding border border-gray-400 outline-none focus:border-gray-800 ${className}`}
      type={type}
      autoComplete="off"
      {...props}
    />
  );
};

export default FormInput;
