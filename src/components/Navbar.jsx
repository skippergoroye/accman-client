import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../assets/PNG/logo.png";
import { Button } from "./ui/button";
import { AlignJustify, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className="fixed top-0 left-0 z-10 w-full">
      <div className="items-center justify-between py-4 bg-white md:flex md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <span className="pt-2 mr-1 text-3xl text-indigo-600 w-28">
            <Link to="/">
              <img src={Logo} alt="Logo" className="" />
            </Link>
          </span>
        </div>

        <div
          onClick={toggleMenu}
          className="absolute text-3xl cursor-pointer text-primary right-8 top-6 md:hidden"
        >
          {open ? <X /> : <AlignJustify />}
        </div>

        <ul
          className={`logo md:flex md:items-center md:pb-0 pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-16 " : "top-[-90px]"
          } origin-top `}
        >
          <li className="mb-3 text-xl md:ml-8 md:mb-0 md:my-0 my-7">
            <Button
              variant="ghost"
              className="p-0 m-0 bg-transparent hover:bg-transparent"
            >
              <Link to="/login">Login</Link>
            </Button>
          </li>
          <li className="my-12 mt-2 text-xl md:ml-8 md:mt-0 md:my-0">
            <Button className="hover:bg-violet-900">
              <Link to="/create-account"> Create Account</Link>
            </Button>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
