"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop == false) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isDesktop]);
  return (
    <div className="flex bg-[#181C14] text-[#ECDFCC]">
      <div className="md:w-64 h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
