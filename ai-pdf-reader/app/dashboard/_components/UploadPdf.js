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
import { useAction, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import uuid4 from "uuid4";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const UploadPdf = ({ isMaxFile }) => {
  const [useFile, setUseFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const [debounce, setDebounce] = useState();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocumnet = useAction(api.myActions.ingest);
  const { toast } = useToast();

  const onFileEvent = (e) => {
    setUseFile(e.target.files[0]);
  };

  const getFileNameHandler = (e) => {
    setFileName(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(fileName);
    }, 700);
    return () => clearTimeout(timer);
  }, [fileName]);

  const onUplaod = async () => {
    if (!useFile) {
      toast({ title: "Please select a file", type: "error" });
      return;
    }
    if (useFile.size > 5 * 1024 * 1024) {
      toast({ title: "File size exceeds the 5MB limit", type: "error" });
      return;
    }
    try {
      setLoading(true);
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": useFile?.type },
        body: useFile,
      });
      const { storageId } = await result.json();
      console.log("the storage id is ", storageId);
      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId });
      console.log("fileUrl is ------- ", fileUrl);
      await addFileEntry({
        fileId: fileId,
        storage: storageId,
        fileName: fileName ?? "unTitled file",
        fileUrl: fileUrl,
        createBy: user?.primaryEmailAddress?.emailAddress,
      });
      toast({ title: "File uploaded successfully", type: "success" });

      // API call to fetch PDF process data
      console.log("above the axious acall");
      const response = await axios.get(`/api/pdf-loader?pdfUrl=${fileUrl}`);
      console.log("the response is ", response.data.result);
      const embadedresult = await embeddDocumnet({
        splitText: response.data.result,
        fileId: fileId,
      });
      console.log("the embaded result is ", embadedresult);
    } catch (error) {
      toast({ title: "Upload failed. Please try again", type: "error" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {" "}
        {/* Added onOpenChange */}
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            disabled={isMaxFile}
            className="w-full"
          >
            + Upload PDF File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3" >Upload PDF File</DialogTitle>
            <DialogDescription asChild>
              <div>
                <h2>Select a file to Upload</h2>
                <div className="flex mt-1 p-4 rounded-md border">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => onFileEvent(e)}
                  />
                </div>
                <div className="mt-2">
                  <label>
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
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <Button onClick={onUplaod} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
        <Toaster position="bottom-right" />
      </Dialog>
    </>
  );
};

export default UploadPdf;
