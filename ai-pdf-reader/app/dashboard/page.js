"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div>
      <h2 className="font-medium text-3xl ml-10">WorkSpace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {fileList?.length > 0
          ? fileList.map((file) => (
              <Link href={"/workspace/" + file.fileId} key={file.fileId}>
                <div
                  className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border hover:cursor-pointer hover:scale-105 transition-all"
                >
                  <Image src="/pdf.png" width={70} height={70} alt="pdf" />
                  <h2 className="mt-3 font-medium text-lg">{file.fileName}</h2>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div
                key={item}
                className="bg-slate-200 rounded-md h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
