"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
const WorkSpaceHeader = ({ fileName }) => {
  const { user } = useUser();
  return (
    <div className="w-full flex items-center justify-between bg-[#181C14] text-[#ECDFCC] shadow-sm shadow-slate-500 p-4 fixed top-0 left-0 right-0">
      <Link href="/dashboard">
        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="text-md md:text-xl font-bold"
        >
          AI-PDF-READER
        </motion.h2>
      </Link>
      <motion.h2
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.9,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="text-xs md:text-md font-normal"
      >
        File Name : {fileName}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.7,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex items-center justify-end"
      >
        {user && (
          <p className="mr-4 hidden md:block">
            Hi ! {user.fullName || `${user.firstName} ${user.lastName}`}
          </p>
        )}
        <UserButton />
      </motion.div>
    </div>
  );
};

export default WorkSpaceHeader;
