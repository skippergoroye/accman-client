import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import DocumentImg from "../assets/PNG/documents.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Navbar />
      <div className="text-center pt-[120px]">
        <h1 className="text-[68px] font-bold line-[67px]">
          Unlock <span className="text-[#C4B5FD]">Efficiency</span>.
        </h1>
        <h5 className="text-[38.32px] mb-3">
          Seamlessly Manage your Accounts Today!
        </h5>
        <div className="flex flex-col items-center">
          <div className="flex gap-6">
            <Link
              to="/login"
              className="bg-[#F9FAFB] border-2 border-[#CBD5E1] text-[16px] py-2 px-8 rounded-lg text-black"
            >
              Learn More
            </Link>
            <Link
              to="/create-account"
              className="bg-[#374151] py-2 px-8 rounded-lg text-[16px] text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={DocumentImg}
            alt="Documents"
            className="mt-12 h-auto w-full max-w-[300px]"
          />
        </div>
      </div>
      <div className="pt-4  md:py-[10px]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
