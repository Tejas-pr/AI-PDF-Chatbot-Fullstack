"use client";
import React, { useEffect } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_components/TextEditor";
import { useParams } from "next/navigation";

const WorkSpace = () => {
  const { fileId } = useParams(); // from here error
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileId,
  });
  useEffect(() => {
    console.log(fileInfo);
  }, [fileId]);
  return (
    <div>
      <WorkSpaceHeader fileName={fileInfo?.fileName}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <TextEditor fileId={fileId} />
        </div>
        <div>
          <PdfViewer fileUrl={fileInfo?.fileUrl}/>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
