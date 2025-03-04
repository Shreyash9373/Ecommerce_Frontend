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

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const { auth, isLoading } = useAuth();

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Trendify" />
      </Link>
      <ul className="hidden gap-5 text-sm text-gray-700 md:flex">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <span
          onClick={() => setShowSearch(true)}
          className="text-3xl cursor-pointer"
        >
          <CiSearch />
        </span>
        {isLoading ? (
          <Loader className="text-2xl text-gray-800" />
        ) : auth.id ? (
          <Link to="/user/account">
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
        <span
          onClick={() => setVisible(true)}
          className="text-xl cursor-pointer md:hidden"
        >
          <HiOutlineMenuAlt3 />
        </span>
      </div>

      {/* INFO: Sidbar menu for smaller screens */}
      <div
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
      </div>
    </div>
  );
};

export default NavBar;
