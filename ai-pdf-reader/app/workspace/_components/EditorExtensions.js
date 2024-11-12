import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { Bold, Italic, SparklesIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const EditorExtensions = ({ editor }) => {
  const onAiClick = async () => {
    const {fileId} = useParams();
    const searchAI = useAction(api.myActions.search);
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log(selectedText);
    const result = await searchAI({
      query: selectedText,
      fileId: fileId
    })
    console.log("Unformatted ans", result);
  };
  return (
    editor && (
      <>
        <div className="p-5">
          <div className="control-group flex ">
            <div className="flex flex-col">
              <div className="button-group">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={
                    editor.isActive("bold")
                      ? "bg-slate-300 rounded-lg p-2 mx-1"
                      : "bg-white rounded-lg p-2 mx-1"
                  }
                >
                  <Bold />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={
                    editor.isActive("italic")
                      ? "bg-slate-300 rounded-lg p-2 mx-1"
                      : "bg-white rounded-lg p-2 mx-1"
                  }
                >
                  <Italic />
                </button>

                <button
                  onClick={() => onAiClick()}
                  className="p-2 mx-1 hover:text-blue-500"
                >
                  <SparklesIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default EditorExtensions;
