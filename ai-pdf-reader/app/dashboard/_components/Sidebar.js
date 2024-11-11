import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import React from "react";
import UploadPdf from "./UploadPdf";

const Sidebar = () => {
  return (
    <div className="shadow-md h-screen p-7">
      <h2 className="text-xl font-bold">Ai-PDF-reader</h2>
      <div className="mt-10">
        <UploadPdf>
          <Button className="w-full">Upload PDF</Button>
        </UploadPdf>
        <div className="flex gap-2 items-center mt-5 p-3 hover:bg-slate-100 cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center mt-1 p-3 hover:bg-slate-100 cursor-pointer">
          <Shield />
          <h2>Upgarde +</h2>
        </div>
      </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={50} />
        <p className="text-sm mt-2">2 out of 5 Pdf Uploaded</p>
        <p className="text-xs mt-1 text-gray-400">Upgrade to Upload more PDF</p>
      </div>
    </div>
  );
};

export default Sidebar;
