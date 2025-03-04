import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
