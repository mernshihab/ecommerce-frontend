import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-40 bg-gray-800 p-4">
      <div className="ml-5 flex justify-between items-center">
        <Link to="/">
          <img className="h-10" src="logo.svg" alt="logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
