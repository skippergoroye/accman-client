import userIcon from "../assets/icons/user-icon.svg";
import lock from "../assets/icons/lock.svg";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";

function Settings() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (active) => {
    setActiveLink(active);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <DashboardLayout isSettings={true}>
      <div className="flex gap-8 p-6 sm:p-8 md:p-10">
        <div className="hidden md:flex flex-col gap-6 w-[240px]">
          <h3 className="text-base font-medium text-gray-900">General</h3>

          <ul className="flex flex-col">
            <li>
              <Link
                to={"/settings"}
                onClick={() => handleLinkClick("/settings")}
                className={`flex items-center gap-4 px-4 py-2.5 rounded-md cursor-pointer ${
                  activeLink === "/settings" ? "bg-zinc-200" : "bg-transparent"
                }`}
              >
                <img src={userIcon} alt="" />
                <span className="text-sm text-zinc-700">Account Details</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/settings/security-settings"}
                onClick={() => handleLinkClick("/settings/security-settings")}
                className={`flex items-center gap-4 px-4 py-2.5 rounded-md cursor-pointer ${
                  activeLink === "/settings/security-settings"
                    ? "bg-zinc-200"
                    : "bg-transparent"
                }`}
              >
                <img src={lock} alt="" />
                <span className="text-sm text-zinc-700">Security</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 px-6 py-8 bg-white rounded-md shadow sm:px-10">
          <div className="block mb-12 md:hidden">
            <div className="flex gap-6 border-b">
              <div>
                <Link
                  to={"/settings"}
                  onClick={() => handleLinkClick("/settings")}
                  className={`flex items-center gap-4 px-4 py-2.5 cursor-pointer ${
                    activeLink === "/settings"
                      ? "border-b-2 border-violet-600"
                      : "border-0"
                  }`}
                >
                  <img src={userIcon} alt="" />
                  <span className="text-sm text-zinc-700">Account Details</span>
                </Link>
              </div>
              <div>
                <Link
                  to={"/settings/security-settings"}
                  onClick={() => handleLinkClick("/settings/security-settings")}
                  className={`flex items-center gap-4 px-4 py-2.5 cursor-pointer ${
                    activeLink === "/settings/security-settings"
                      ? "border-b-2 border-violet-600"
                      : "border-0"
                  }`}
                >
                  <img src={lock} alt="" />
                  <span className="text-sm text-zinc-700">Security</span>
                </Link>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
