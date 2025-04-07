import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";

import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import Loader from "./utils/Loader";
import FormInput from "./utils/FormInput";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const { auth, isLoading } = useAuth();

  return (
    <div className="flex items-center justify-between px-2 p-2 font-medium md:px-5 md:p-5">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Trendify" />
      </Link>
      {/* Search bar */}
      <SearchBar className="w-1/2 hidden lg:block" />
      <div className="flex items-center gap-2 lg:gap-6">
        <NavLink
          to="/registration"
          className="flex items-center gap-2 border border-gray-400 hover:bg-gray-100 px-4 py-2"
        >
          <p>Become a Seller?</p>
        </NavLink>

        {isLoading ? (
          <Loader className="text-2xl text-gray-800" />
        ) : auth.id ? (
          <Link to="/account">
            <VscAccount className="text-2xl cursor-pointer" />
          </Link>
        ) : (
          <Link to="/login" className="min-w-fit btn-outline">
            Sign in / Sign up
          </Link>
        )}
        {isLoading ? (
          <Loader className="text-2xl text-gray-800" />
        ) : (
          <Link to="/cart" className="relative">
            <IoCartOutline className="text-3xl cursor-pointer" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
        )}
        {/* <span
          onClick={() => setVisible(true)}
          className="text-xl cursor-pointer md:hidden"
        >
          <HiOutlineMenuAlt3 />
        </span> */}
      </div>

      {/* INFO: Sidbar menu for smaller screens */}
      {/* <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <IoMdArrowDropdown className="text-lg rotate-90" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div> */}
    </div>
  );
};

export default NavBar;
