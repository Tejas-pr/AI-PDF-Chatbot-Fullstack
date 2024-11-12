"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_components/TextEditor";

const WorkSpace = () => {
  const { fileId } = useParams(); // from here error
  console.log(" the file id is ", fileId);
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileId,
  });
  console.log("in filed - pages " , fileInfo?.fileUrl);
  useEffect(() => {
    console.log(fileInfo);
  }, [fileId]);
  return (
    <div>
      <WorkSpaceHeader fileName={fileInfo?.fileName}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          {/* test editor  */}
          <TextEditor fileId={fileId} />
        </div>
        <div>
          {/* pdf view  */}
          <PdfViewer fileUrl={fileInfo?.fileUrl}/>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
