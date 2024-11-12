import { useParams } from "next/navigation";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowRight } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import EditorExtensions from "./EditorExtensions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Placeholder from "@tiptap/extension-placeholder";

const TextEditor = () => {
  const { fileId } = useParams(); // ✅ Move to the top level
  const searchAI = useAction(api.myActions.search); // ✅ Move to the top level
  const [inputVal, setInputVal] = useState("");

  const onClickHandler = async () => {
    console.log("The file ID is in TextEditor", fileId);
    const result = await searchAI({
      query: inputVal,
      fileId: fileId,
    });
    console.log(result);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start taking your notes...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none p-5 h-[60vh]",
      },
    },
  });

  return (
    <div>
      <EditorExtensions editor={editor} />
      <div>
        <EditorContent editor={editor} />
        <div className="grid w-full gap-2 p-4">
          <Textarea
            placeholder="Type your message here."
            onChange={(e) => setInputVal(e.target.value)}
          />
          <Button onClick={() => onClickHandler()}>
            <span>Generate</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
