import React, { useEffect, useRef, useState } from "react";
import {
  CodeiumEditorProps,
  CodeiumEditor as IDE,
} from "@codeium/react-code-editor";
import { useClickOutside, useFocusWithin } from "@mantine/hooks";
import StepsBlockAction from "../../../../actions/project/stepsBlock";
import GetProject from "@/actions/project";
import { Loader } from "lucide-react";

type Props = {
  language: string;
  code: string;
  onChange: (code: string) => void;
};

const IDEditor = ({ code, onChange, language }: Props) => {
  const [focused, setFocused] = useState(false);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any, monacoInstance: any) => {
    editorRef.current = editor;

    editor.onDidFocusEditorWidget(() => {
      setFocused(true);
      console.log("🔥 Editor focused");
    });

    editor.onDidBlurEditorWidget(() => {
      setFocused(false);
      console.log("💤 Editor blurred");
    });
  };

  const PopoverContextTrigger = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      console.log("Escape key hit! Focused? 👉", focused);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", PopoverContextTrigger);
    return () => {
      window.removeEventListener("keydown", PopoverContextTrigger);
    };
  }, [focused]);

  return (
    <div className="relative w-[100%] overscroll-none h-full rounded-lg overflow-hidden">
      <IDE
        language={language}
        theme="vs-dark"
        path="/editor.ts"
        loading={
          <div className="h-full w-full flex items-center justify-center bg-[#1e1e1e]">
            {/* <Loader className="animate-spin" /> */}
          </div>
        }
        onMount={(editor, monaco) => handleEditorDidMount(editor, monaco)}
        defaultValue={code || ""}
        height={"100%"}
        options={{
          fontSize: 14,
          fontFamily: "Consolas, 'Courier New', monospace",
        }}
        onChange={(code) => onChange(code || "")}
        className=""
      />
      <div className="absolute w-14 h-full z-10 top-0 rounded-r-lg right-0 bg-[#1e1e1e]"></div>
    </div>
  );
};

export default IDEditor;
