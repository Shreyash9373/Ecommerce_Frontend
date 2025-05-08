import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Apply flex to the root container */}
      <div className="w-11/12 flex-1 mx-auto flex flex-col">
        {" "}
        {/* Content container with flex-grow */}
        <NavBar />
        <div className="flex-grow">
          {" "}
          {/* Make the Outlet take up available space */}
          <Outlet />
        </div>
      </div>
      <Footer /> {/* Footer will be pushed to the bottom */}
    </div>
  );
};

export default MainLayout;
