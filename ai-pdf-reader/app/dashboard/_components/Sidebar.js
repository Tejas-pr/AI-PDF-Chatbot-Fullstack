"use client";
import { Progress } from "@/components/ui/progress";
import { AlignJustifyIcon, Layout, Shield } from "lucide-react";
import React from "react";
import UploadPdf from "./UploadPdf";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useUser();
  const path = usePathname();

  const GetUserInfo = useQuery(api.user.GetUserInfo, {
    useEmail: user?.primaryEmailAddress?.emailAddress,
  });

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  if (!sidebarOpen) {
    return (
      <div className="fixed top-0 left-0 transition-all duration-500 p-5 h-screen z-20 bg-[#181C14] shadow shadow-slate-700 text-[#ECDFCC]">
        <div
          className="cursor-pointer"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <AlignJustifyIcon />
        </div>
      </div>
    );
  }
  return (
    <div className="w-64 md:w-72 lg:w-96 h-screen bg-[#181C14] text-[#ECDFCC] fixed top-0 left-0 z-50 md:relative transition-all p-5 duration-500 shadow shadow-slate-700">
      <div className="flex gap-5 items-center justify-start">
        <div
          className="cursor-pointer block md:hidden"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <AlignJustifyIcon />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Link href="/dashboard">
            <h2 className="text-xl font-bold">AI-PDF-READER</h2>
          </Link>
        </motion.div>
      </div>
      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <UploadPdf isMaxFile={fileList?.length >= 5} />
        </motion.div>
        <Link href={"/dashboard"}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={`flex gap-2 items-center mt-5 p-3 hover:bg-slate-400 cursor-pointer ${
              path == "/dashboard" && "bg-slate-500"
            }`}
          >
            <Layout />
            <h2>Workspace</h2>
          </motion.div>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={`flex gap-2 items-center mt-1 p-3 hover:bg-slate-400 cursor-pointer ${
              path == "/dashboard/upgrade" && "bg-slate-500"
            }`}
          >
            <Shield />
            <h2>Upgrade +</h2>
          </motion.div>
        </Link>
      </div>
      {GetUserInfo && !GetUserInfo[0]?.upgrade && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute bottom-24 pr-4 "
        >
          <Progress value={(fileList?.length / 5) * 100} />
          <p className="text-sm mt-2">
            {fileList?.length} out of 5 Pdf Uploaded
          </p>
          <p className="text-xs mt-1 text-gray-400">
            Upgrade to Upload more PDF
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
