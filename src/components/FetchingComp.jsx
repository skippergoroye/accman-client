import React from "react";
import DocumentImg from "../assets/PNG/documents.png";

function FetchingComp({ message = "Fetching..." }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={DocumentImg}
        alt="Documents"
        className="mt-12 h-auto w-full max-w-[200px]"
      />
      <div className="gap-2 mt-10 centered">
        <h3 className="text-base">{message}</h3>
      </div>
    </div>
  );
}

export default FetchingComp;
