"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import React from "react";
import UploadPdf from "./UploadPdf";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const { user } = useUser();
  const path = usePathname();

  const GetUserInfo = useQuery(api.user.GetUserInfo, {
    useEmail: user?.primaryEmailAddress?.emailAddress,
  });

  console.log("The user info is", GetUserInfo);
  console.log(GetUserInfo ? GetUserInfo[0]?.upgrade : "Loading...");

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div className="shadow-md h-screen p-7">
      <Link href="/dashboard">
        <h2 className="text-xl font-bold">Ai-PDF-reader</h2>
      </Link>
      <div className="mt-10">
        <UploadPdf isMaxFile={fileList?.length >= 5}/>
        <Link href={"/dashboard"}>
          <div
            className={`flex gap-2 items-center mt-5 p-3 hover:bg-slate-100 cursor-pointer ${
              path == "/dashboard" && "bg-slate-100"
            }`}
          >
            <Layout />
            <h2>Workspace</h2>
          </div>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <div
            className={`flex gap-2 items-center mt-1 p-3 hover:bg-slate-100 cursor-pointer ${
              path == "/dashboard/upgrade" && "bg-slate-100"
            }`}
          >
            <Shield />
            <h2>Upgrade +</h2>
          </div>
        </Link>
      </div>
      {GetUserInfo && !GetUserInfo[0]?.upgrade && (
        <div className="absolute bottom-24 w-[80%]">
          <Progress value={(fileList?.length / 5) * 100} />
          <p className="text-sm mt-2">
            {fileList?.length} out of 5 Pdf Uploaded
          </p>
          <p className="text-xs mt-1 text-gray-400">
            Upgrade to Upload more PDF
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
