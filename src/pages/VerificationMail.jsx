import Logo from "../assets/PNG/logo.svg";
import VerifyImg from "../assets/PNG/envilope.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const VerificationMail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state.email, "ROUTEEES");
  setTimeout(() => {
    navigate("/verify-otp");
  }, 10000);

  return (
    <div className="flex items-center justify-center bg-[#eef2ff] flex-col h-screen">
      <div className="flex items-center justify-center w-full text-center">
        <img src={Logo} alt="Logo" className="h-9 md:h-[40px]" />
      </div>
      <div className="items-center justify-center w-11/12 md:w-10/12 lg:w-7/12 px-2 pt-[52px] pb-20 mx-auto text-center bg-white border mt-8 md:mt-14 rounded-xl">
        <div className="flex justify-center">
          <img
            src={VerifyImg}
            alt="VerifyImg"
            className="h-[45px] md:h-[90px] "
          />
        </div>
        <div className="w-11/12 mx-auto md:w-8/12">
          <p className="mt-10 text-sm font-normal ">
            Dear customer, your verification link has just been sent to your
            email address
            <Link to="/" className="font-semibold text-violet-600">
              ({location.state.email})
            </Link>
            . Click the link to verify your account.
          </p>
        </div>
        <p className="mt-6 text-sm font-normal">
          Didn’t get the mail?{" "}
          <Link
            to="/reset-new-password"
            className="font-semibold text-violet-600"
          >
            Click to resend
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerificationMail;
