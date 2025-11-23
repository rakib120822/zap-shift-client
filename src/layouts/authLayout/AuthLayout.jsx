import React from "react";
import Logo from "../../component/Logo/Logo";
import { Outlet } from "react-router";
import authImg from "../../assets/authImage.png";
function AuthLayout() {
  return (
    <div className="max-w-7xl mx-auto ">
      <Logo />
      <div className="flex items-center">
        <div className="flex-1 ">
          <Outlet />
        </div>
        <div className="flex-1 bg-[#FAFDF0]">
          <img src={authImg} />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
