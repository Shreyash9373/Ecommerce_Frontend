import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
