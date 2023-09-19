"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="flex md:justify-end justify-between items-center px-5 py-3">
      <MobileSidebar />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
