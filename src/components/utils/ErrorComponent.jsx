import React from "react";

const SWR = ({ className, text = "Something went wrong!" }) => {
  return (
    <div
      className={`text-xl text-gray-600/50 text-center font-light md:text-2xl lg:text-4xl ${className}`}
    >
      {text}
    </div>
  );
};

export default SWR;
