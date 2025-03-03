import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="text-center border-t border-b bg-gray-50">
      <div className="inline-flex items-center justify-center w-3/4 px-5 py-2 mx-3 my-5 border border-gray-400 rounded-full sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm outline-none bg-inherit"
          type="text"
          placeholder="Search..."
        />
        <CiSearch className="text-xl" />
      </div>
      <span
        onClick={() => setShowSearch(false)}
        className="cursor-pointer text-3xl"
      >
        &times;
      </span>
    </div>
  ) : null;
};

export default SearchBar;
