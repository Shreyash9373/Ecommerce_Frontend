import React from "react";
import { VscLoading } from "react-icons/vsc";

const Loader = ({ className }) => {
  return <VscLoading className={`${className} animate-spin`} />;
};

export default Loader;
