"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

const WorkSpaceHeader = ({ fileName }) => {
  const { user } = useUser();
  console.log("user", user);
  return (
    <div className="w-full flex items-center justify-between bg-[#181C14] text-[#ECDFCC] shadow-sm shadow-slate-500 p-4 fixed top-0 left-0 right-0">
      <Link href="/dashboard">
        <h2 className="text-md md:text-xl font-bold">AI-PDF-READER</h2>
      </Link>
      <h2 className="text-xs md:text-md font-normal">File Name : {fileName}</h2>
      <div className="flex items-center justify-end">
        {user && (
          <p className="mr-4 hidden md:block">
            Hi ! {user.fullName || `${user.firstName} ${user.lastName}`}
          </p>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
