"use client";
import React from "react";

import PropTypes from "prop-types";
import LadyImg from "../assets/PNG/Lady.png";

const OnboardingLayout = ({
  children,
  sideImage = LadyImg,
  feedback = "",
  author = "",
}) => {
  return (
    <main className="grid max-h-screen grid-cols-12">
      <div className="hidden lg:flex col-span-5 bg-[#EDE9FE] h-screen items-end relative overflow-hidden">
        <img
          src={sideImage}
          alt="SideImg"
          className="object-cover w-full h-full"
        />
        <div className="absolute py-6 px-4 bg-transparent/50 bg-clip-padding backdrop-blur-sm backdrop-filter w-[85%] rounded-xl bottom-10 left-10">
          <div>
            <p className="text-xl font-normal text-white">{feedback}</p>
            <p className="mt-2 text-base italic font-normal text-white">
              {author}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-screen col-span-12 overflow-y-hidden bg-white hideScrollbar lg:col-span-7">
        {children}
      </div>
    </main>
  );
};

OnboardingLayout.propType = {
  children: React.ReactNode,
  sideImage: PropTypes.string,
  feedback: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default OnboardingLayout;
