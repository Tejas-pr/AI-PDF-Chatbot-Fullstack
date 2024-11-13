import { useParams } from "next/navigation";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowRight } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import EditorExtensions from "./EditorExtensions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Placeholder from "@tiptap/extension-placeholder";
import { toast } from "sonner";
import { chatSession } from "@/config/AIModel";
import { useUser } from "@clerk/nextjs";

const TextEditor = ({ fileId }) => {
  const searchAI = useAction(api.myActions.search);
  const { user } = useUser();
  const saveNotes = useMutation(api.notes.AddNotes);
  const notes = useQuery(api.notes.GetAllNotes, {
    fileId: fileId,
  });
  const [inputVal, setInputVal] = useState("");

  const onClickHandler = async () => {
    if (!editor) return;

    toast("AI is thinking...");
    const selectedText = inputVal;
    const result = await searchAI({
      query: selectedText,
      fileId: fileId,
    });

    const unFormattedAns = JSON.parse(result);
    let AllunFormattedAns = "";
    unFormattedAns &&
      unFormattedAns.forEach((item) => {
        AllunFormattedAns += item.pageContent;
      });

    const PROMPT = `FOR Question: ${selectedText} and with the given context as answer ${AllunFormattedAns}, please give appropriate answer in HTML format.`;
    const AiModelResult = await chatSession.sendMessage(PROMPT);
    const FinalAns = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");

    editor.commands.setContent(
      "<p> <p>Answer for the input : </p> <br/>" + FinalAns + "</p>"
    );
    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createBy: user?.primaryEmailAddress?.emailAddress,
    });
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

  // const GetAllNotes =
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(notes);
  }, [editor && notes]);

  return (
    <div className="bg-[#181C14] text-[#ECDFCC]">
    {/* <div className=""> */}
      <EditorExtensions editor={editor} />
      <div className="overflow-y-scroll h-[70vh] p-5">
        <EditorContent editor={editor} />
      </div>
      <div className="grid w-full gap-2 p-4">
        <Textarea
          placeholder="Type your message here."
          onChange={(e) => setInputVal(e.target.value)}
        />
        <Button onClick={() => onClickHandler()} >
          <span>Generate</span>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
