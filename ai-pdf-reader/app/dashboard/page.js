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
    <>
      <div className="">
        <h2 className="font-medium text-3xl mt-24 ml-20 md:-ml-28">WorkSpace</h2>
        <div className="grid grid-cols-3 md:grid-cols-8 gap-5 mt-10 ml-20 md:-ml-28 mr-10">
          {fileList?.length > 0
            ? fileList.map((file) => (
                <Link href={"/workspace/" + file.fileId} key={file.fileId}>
                  <div className="flex p-3 shadow-md rounded-md flex-col items-center justify-center border hover:cursor-pointer hover:scale-105 transition-all">
                    <Image src="/pdf.png" width={70} height={70} alt="pdf" />
                    <h2 className="mt-2 font-normal md:font-medium text-xs md:text-md">
                      {file.fileName}
                    </h2>
                  </div>
                </Link>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-slate-700 rounded-md h-[100px] w-[100px] animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
