import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Loader from "./utils/Loader";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getCartCount } = useContext(ShopContext);
  const { user, logout, loadingUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="relative flex items-center justify-between px-2 p-2 font-medium md:px-5 md:p-5">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Trendify" />
      </Link>

      <SearchBar className="w-1/2 hidden lg:block" />

      <div className="flex items-center gap-2 lg:gap-6">
        <NavLink
          to="/registration"
          className="flex items-center gap-2 border border-gray-400 hover:bg-gray-100 px-4 py-2"
        >
          <p>Become a Seller?</p>
        </NavLink>

        {loadingUser ? (
          <Loader className="text-2xl text-gray-800" />
        ) : (
          <div className="relative">
            <VscAccount
              className="text-2xl cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-md z-50">
                {user ? (
                  <>
                    <Link
                      to="/account"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Account
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Sign in / Sign up
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        <Link to="/cart" className="relative">
          <IoCartOutline className="text-3xl cursor-pointer" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
