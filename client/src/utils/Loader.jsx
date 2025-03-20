import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-light-gray">
      <HashLoader color="var(--primary)" />
    </div>
  );
};

export default Loader;
