import React from "react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className="p-3 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 flex flex-row justify-between items-center">
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
      <div className="flex flex-row gap-6 items-center hidden phone:flex phone:visible">
        <>
          <Link href="/about">About</Link>
        </>
        <>
          <Link href="/posts">Posts</Link>
        </>
        <Link className="btn-sec" href="/contact">
          Contact
        </Link>
        <>
          <button className="btn toggle-mode">TOGGLE</button>
        </>
      </div>
    </nav>
  );
};

export default Nav;
