"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  console.log("user", user);
  return (
    <div className="w-full flex items-center justify-between bg-[#181C14] mr-10 text-[#ECDFCC] shadow shadow-slate-700 p-4 fixed top-0 left-0 right-0">
      <Link href="/dashboard">
        <h2 className="text-xl font-bold p-1 pl-14 md:pl-20">AI-PDF-READER</h2>
      </Link>
      <div className="flex items-center justify-end">
        {user && (
          <p className="mr-4 text-xs md:text-md">Hi ! {user.fullName || `${user.firstName} ${user.lastName}`}</p>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
