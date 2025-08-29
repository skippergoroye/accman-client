import { Menu, User } from "lucide-react";
import React, { useState } from "react";
import MobileSideBar from "./mobileSideBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DashBoardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state?.authUser);
  const [user, setUser] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("/backoffice")) {
      setUser("Admin");
    } else if (userInfo) {
      setUser(userInfo?.firstName);
    }
  }, [pathname]);
  return (
    <div className="bg-white sticky h-[82px] top-0 w-full px-5 md:px-14 z-20 flex items-center justify-between ">
      <div className="lg:hidden">
        <Menu onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-4">
        <p className="text-sm font-normal">Hi, {user}</p>
        <div className="flex items-center justify-center border rounded-full w-11 h-11">
          <User />
        </div>
      </div>
      <MobileSideBar isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default DashBoardNavbar;
