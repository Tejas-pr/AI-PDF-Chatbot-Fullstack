"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="w-full flex items-center justify-between bg-[#181C14] mr-10 text-[#ECDFCC] shadow shadow-slate-700 p-4 fixed top-0 left-0 right-0">
      <Link href="/dashboard">
        <motion.h2 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="text-md md:text-xl font-bold p-1 pl-14 md:pl-20">AI-PDF-READER</motion.h2>
      </Link>
      <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.7,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="flex items-center justify-end">
        {user && (
          <p className="mr-4 text-xs md:text-md">Hi ! {user.fullName || `${user.firstName} ${user.lastName}`}</p>
        )}
        <UserButton />
      </motion.div>
    </div>
  );
};

export default Header;
