import { memo, useCallback, useEffect, useState } from "react";
import { adminSidebarLinks, sidebarLinks } from "../constants";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/PNG/logo.png";
import {
  LayoutGrid,
  LogOut,
  Settings,
  Users,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import Logout from "./dashboard/Logout";

const DashboardSidebar = () => {
  const { pathname } = useLocation();

  const [route, setRoute] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state?.authUser);

  const [user, setUser] = useState("");

  const getRoute = useCallback(() => {
    let route;
    if (pathname.includes("/backoffice")) {
      route = adminSidebarLinks;
    } else {
      route = sidebarLinks;
    }
    setRoute(route);
  }, [pathname]);

  useEffect(() => {
    getRoute();
  }, []);

  useEffect(() => {
    if (pathname.includes("/backoffice")) {
      setUser("Admin");
    } else if (userInfo) {
      setUser(userInfo?.firstName);
    }
  }, [pathname]);

  const onLogout = () => {
    setIsOpen(!isOpen);
  };
  // const route = pathname.includes("/backoffice")
  //   ? adminSidebarLinks
  //   : sidebarLinks;
  return (
    <div className="relative hidden col-span-3 bg-white border-r lg:block">
      <div className="flex items-center justify-center mt-7">
        <img src={Logo} alt="Logo" className="h-[20px] md:h-[34px]" />
      </div>
      <p className="mt-2 text-center">Howdy {user},</p>
      <div className="w-10/12 mx-auto mt-14">
        {route.map((item) => {
          const isActive = pathname === item.route;
          return (
            <NavLink
              to={item.route}
              key={item.label}
              className={`flex gap-4 items-center pl-5 py-4 w-full rounded-lg justify-start ${
                isActive ? "bg-violet-100 w-[160px]" : ""
              }`}
            >
              <div
                className={`${isActive ? "text-violet-600" : "text-gray-500"}`}
              >
                {ICONS[item.label]}
              </div>
              <p
                className={`${
                  isActive
                    ? "text-violet-600 font-semibold"
                    : "text-gray-500 font-normal"
                } text-lg  max-lg:hidden`}
              >
                {item.label}
              </p>
            </NavLink>
          );
        })}
      </div>
      <Button
        variant="ghost"
        className="absolute flex items-center gap-4 left-16 hover:bg-transparent bottom-10"
        onClick={onLogout}
      >
        <LogOut />
        Logout
      </Button>
      <Logout isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default memo(DashboardSidebar);




export const ICONS = {
  Dashboard: <LayoutGrid />,
  Users: <Users />,
  Settings: <Settings />,
  Transactions: <ArrowRightLeft />,
};
