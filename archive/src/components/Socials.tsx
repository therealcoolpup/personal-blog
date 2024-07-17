import Link from "next/link";
import React from "react";

const Socials = () => {
  return (
    <div
      id="socials"
      className="hidden phone:fixed top-[40%] left-0 phone:flex flex-col text-3xl items-center justify-center"
    >
      <a href="https://www.linkedin.com/in/azaber/" target="_blank">
        <i className="fa-brands fa-linkedin-in hover:cursor-pointer text-white bg-[#0e66c2]"></i>
      </a>
      <a href="http://github.com/realazaber" target="_blank">
        <i className="fa-brands fa-github text-white bg-[#0c1117]"></i>
      </a>
      <Link href="/contact">
        <i className="fa-regular fa-envelope text-white bg-[#f15a24]"></i>
      </Link>
    </div>
  );
};

export default Socials;
