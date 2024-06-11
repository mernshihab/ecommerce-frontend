import React from "react";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-5">
      <div className="px-10 mx-auto flex justify-between items-start pt-3">
        <div>
          <img className="h-10" src="logo.svg" alt="logo" />
          <div className="flex gap-3 mt-8 ml-1">
            <a href="https://www.facebook.com/webshihab" target="_blank">
              <FaFacebook className="text-3xl  text-white " />
            </a>
            <a href="https://www.instagram.com/webshihab" target="_blank">
              <FaInstagram className="text-3xl  text-white " />
            </a>
            <a href="https://www.linkedin.com/in/mernshihab" target="_blank">
              <FaLinkedin className="text-3xl  text-white " />
            </a>
            <a href="https://github.com/mernshihab" target="_blank">
              <FaGithub className="text-3xl  text-white " />
            </a>
          </div>
        </div>
        <div className="text-white space-y-2 text-lg">
          <p>About Us</p>
          <p>Terms of Service</p>
          <p>Contact</p>
        </div>
        <div className="text-white text-lg space-y-2">
          <p>Blog</p>
          <p>Location</p>
          <p>Contact</p>
        </div>
      </div>
      <div className="text-center mt-10 pb-2">
        <p className="text-white font-light text-lg">
          2024. MD. Shihab - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
