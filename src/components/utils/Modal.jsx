import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ open = false, onCancel, className, children }) => {
  const self = useRef();

  useEffect(() => {
    if (open) {
      // disable scroll
      document.body.style.overflow = "hidden";
      // disable other interactions
      document.body.style.pointerEvents = "none";
      self.current.style.pointerEvents = "auto";
    }

    return () => {
      document.body.style.pointerEvents = "auto";
      document.body.style.overflow = null;
    };
  }, [open]);

  return (
    <div
      ref={self}
      className={`${className} ${
        open ? "flex" : "hidden"
      } flex-col gap-8 fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white padding`}
      style={{
        boxShadow: "0 0 0 999px rgba(0 0 0 / .4)",
        backdropFilter: "blur(5px)",
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
