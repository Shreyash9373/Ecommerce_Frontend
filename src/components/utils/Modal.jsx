import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ open = false, onCancel, className, children }) => {
  return (
    <div
      className={`${className} ${
        open ? "flex" : "hidden"
      } flex-col gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white padding`}
      style={{
        boxShadow: "0 0 0 999px rgba(0 0 0 / .4)",
      }}
    >
      <RxCross2
        className="text-xl self-end cursor-pointer"
        onClick={onCancel}
      />
      {children}
    </div>
  );
};

export default Modal;
