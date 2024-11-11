"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import uuid4 from "uuid4";

const UploadPdf = ({ children }) => {
  const [useFile, setUseFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const onFileEvent = (e) => {
    setUseFile(e.target.files[0]);
  };

  const getFileNameHandler = (e) => {
    setFileName(e.target.value)
  }

  console.log(useFile);

  const onUplaod = async () => {
    setLoading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": useFile?.type },
      body: useFile, // send file in the body
    });
    const { storageId } = await result.json();
    const fileId = uuid4();
    const fileurl = await getFileUrl({ storageId });
    const fileToConvex = await addFileEntry({
      fileId: fileId,
      storage: storageId,
      fileName: fileName ?? "unTitled file",
      fileUrl: fileurl,
      createBy: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(fileToConvex);
    setLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="">Select a file to Upload</h2>
              <div className="flex mt-1 p-4 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => onFileEvent(e)}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="">
                  <span className="text-red-600">* </span>File Name
                </label>
                <Input
                  placeholder="Enter the File Name..."
                  onChange={getFileNameHandler}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onUplaod}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdf;
