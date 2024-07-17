import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 bottom-0 right-0 bg-white dark:bg-slate-800 z-50 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center">
          <Link
            onClick={handleMenuToggle}
            href="/about"
            className="text-pri text-xl py-4 hover:text-sec"
          >
            About
          </Link>
          <Link
            onClick={handleMenuToggle}
            href="/posts"
            className="text-pri text-xl py-4 hover:text-sec"
          >
            Posts
          </Link>
          <Link
            onClick={handleMenuToggle}
            href="/contact"
            className="text-pri text-xl py-4 hover:text-sec"
          >
            Contact
          </Link>
          <div className="flex flex-row rounded-lg mt-3">
            <a href="https://www.linkedin.com/in/azaber/" target="_blank">
              <i className="p-3 text-4xl fa-brands fa-linkedin-in hover:cursor-pointer text-white bg-[#0e66c2]"></i>
            </a>
            <a href="http://github.com/realazaber" target="_blank">
              <i className="p-3 text-4xl fa-brands fa-github text-white bg-[#0c1117]"></i>
            </a>
            <Link href="/contact">
              <i className="p-3 text-4xl fa-regular fa-envelope text-white bg-[#f15a24]"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="h-20 shadow-md p-3 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 flex flex-row justify-between items-center">
        <div>
          <Link href="/">
            <Image
              className="object-contain"
              src="/assets/images/logo.webp"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="flex flex-row gap-6 items-center">
          <Link className="hidden phone:flex" href="/about">
            About
          </Link>
          <Link className="hidden phone:flex" href="/posts">
            Posts
          </Link>
          <Link
            className="btn-sec hidden phone:flex phone:visible"
            href="/contact"
          >
            Contact
          </Link>
          <FontAwesomeIcon
            icon={faBurger}
            className="block phone:hidden fa-solid fa-burger text-pri text-3xl cursor-pointer"
            onClick={handleMenuToggle}
          />
        </div>
      </nav>
    </>
  );
};

export default Nav;
