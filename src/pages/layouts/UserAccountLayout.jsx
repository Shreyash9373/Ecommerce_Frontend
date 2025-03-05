import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";

const linkClasses = ({ isActive }) =>
  (isActive ? "bg-gray-100 font-medium" : "") + " rounded-md px-4 py-1";

const UserAccountLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  return (
    <div>
      {/* mobile sidebar */}
      <div
        className={`${
          menuOpen ? "-translate-x-0" : "-translate-x-full"
        } py-10 px-5 absolute z-50 bg-white h-screen w-2/3 flex flex-col gap-2 transition-transform duration-300 ease-in-out md:hidden`}
        style={{
          boxShadow: menuOpen ? "0 0 0 999px rgba(0 0 0 / .4)" : "",
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-gray-800">Settings</h1>
          <span onClick={handleMenuToggle} className="text-3xl text-gray-600">
            &times;
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <NavLink
            onClick={handleMenuToggle}
            to="general"
            className={linkClasses}
          >
            General
          </NavLink>
          <NavLink
            onClick={handleMenuToggle}
            to="password"
            className={linkClasses}
          >
            Password
          </NavLink>
          <NavLink
            onClick={handleMenuToggle}
            to="address"
            className={linkClasses}
          >
            Address
          </NavLink>
          <NavLink
            onClick={handleMenuToggle}
            to="orders"
            className={linkClasses}
          >
            Orders
          </NavLink>
        </div>
      </div>

      <div className="[--y-padding:2.5rem] py-10 flex gap-4 min-h-[95vh] w-11/12 mx-auto md:px-2 md:gap-32 lg:px-4 xl:px-20">
        {/* hamburger button */}
        <IoMenu
          onClick={handleMenuToggle}
          className="text-2xl text-gray-600 md:hidden"
        />

        {/* desktop sidebar */}
        <div className="hidden flex-col gap-3 py-[--y-padding] md:flex">
          <h1 className="text-3xl text-gray-800">Settings</h1>
          <div className="flex flex-col gap-2">
            <NavLink to="general" className={linkClasses}>
              General
            </NavLink>
            <NavLink to="password" className={linkClasses}>
              Password
            </NavLink>
            <NavLink to="address" className={linkClasses}>
              Address
            </NavLink>
            <NavLink to="orders" className={linkClasses}>
              Orders
            </NavLink>
          </div>
        </div>
        {/* content */}
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserAccountLayout;
