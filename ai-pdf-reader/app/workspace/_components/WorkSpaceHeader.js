import { UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

const WorkSpaceHeader = ({ fileName }) => {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Link href="/dashboard">
        <h2 className="text-xl font-bold">Ai-PDF-reader</h2>
      </Link>
      <h2 className="text-xl font-normal">File Name : {fileName}</h2>
      <UserButton />
    </div>
  );
};

export default WorkSpaceHeader;
