import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../pages/shared/navbar/NavBar";
import Footer from "../../pages/shared/footer/Footer";

function Root() {
  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
