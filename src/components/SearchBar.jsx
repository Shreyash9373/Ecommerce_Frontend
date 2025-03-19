import React from "react";
import { CiSearch } from "react-icons/ci";

import FormInput from "./utils/FormInput";

const SearchBar = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <FormInput className="w-full" placeholder="Search..." />
      <CiSearch className="text-xl absolute z-10 right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchBar;
