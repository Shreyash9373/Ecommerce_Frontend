import React from "react";

const FormInput = ({ className, type = "text", ...props }) => {
  return (
    <input
      className={`${className} padding border border-gray-400 outline-none focus:border-gray-800`}
      type={type}
      autoComplete="off"
      {...props}
    />
  );
};

export default FormInput;
