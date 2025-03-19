import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

import FormInput from "./utils/FormInput";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ className }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchBarKeyDown = (e) => {
    if (e.key === "Enter")
      if (search.length > 0) {
        navigate(`/products?search=${search}`);
      }
  };

  return (
    <div className={`relative ${className}`}>
      <FormInput
        className="w-full"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchBarKeyDown}
      />
      <CiSearch className="text-xl absolute z-10 right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchBar;
