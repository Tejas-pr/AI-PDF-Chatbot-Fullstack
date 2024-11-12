"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // For animations
import { api } from "@/convex/_generated/api";

export default function Home() {
  // USER HOOK
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser = async () => {
    const result = await createUser({
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
    });
    console.log(result);
  };

  return (
    <div className="overflow-hidden bg-gradient-to-b from-black via-gray-900 to-gray-800">
      <div className="flex justify-between items-center p-5 bg-gray-900 text-white fixed w-full top-0 left-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">AI PDF Generator</h2>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button className="px-8 py-3 text-xl bg-slate-500 text-white rounded-lg hover:bg-orange-400 transition-all">
              Dashboard
            </Button>
          </Link>

          <UserButton />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <motion.h1
          className="text-8xl font-bold text-center text-white"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          AI PDF <span className="text-orange-500">GENERATOR</span>
        </motion.h1>
        <motion.p
          className="text-lg text-white text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Seamlessly upload and convert your PDF documents with the power of AI.
          Get started now to experience fast, intuitive, and accurate document
          processing.
        </motion.p>
        <Link href="/dashboard">
          <Button className="mt-5 px-8 py-3 text-xl bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-all">
            GET STARTED
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center py-20 bg-gray-900 text-white">
        <h2 className="text-5xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-screen-xl px-4">
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">Fast Uploads</h3>
            <p>
              Upload and start converting your PDFs in no time. AI-powered
              technology processes documents in seconds.
            </p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">Easy Conversion</h3>
            <p>
              Convert your PDFs to text or extract valuable data effortlessly.
              Our AI makes it easy to manage large files.
            </p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">Secure Processing</h3>
            <p>
              Your documents are safe with us. We ensure encrypted file
              transfers and processing for your peace of mind.
            </p>
          </div>
        </div>
      </div>

      <div className="py-10 bg-black text-white text-center">
        <p className="text-sm">
          © 2024 AI PDF Generator. All rights reserved.
        </p>
        <div className="mt-3">
          <Link
            href="/privacy"
            className="text-orange-500 hover:underline mr-4"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-orange-500 hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
