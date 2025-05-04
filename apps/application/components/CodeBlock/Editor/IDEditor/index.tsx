import React, { useEffect, useRef, useState } from "react";
import {
  CodeiumEditorProps,
  CodeiumEditor as IDE,
} from "@codeium/react-code-editor";
import { useClickOutside, useFocusWithin } from "@mantine/hooks";
import StepsBlockAction from "../../../../actions/project/stepsBlock";
import GetProject from "@/actions/project";
import { Loader } from "lucide-react";
import { Popover } from "@repo/ui/popover";
import PopoverContext from "@/components/PopoverContext";
import { PopoverTrigger } from "@radix-ui/react-popover";

type Props = {
  language: string;
  code: string;
  onChange: (code: string) => void;
};

const IDEditor = ({ code, onChange, language }: Props) => {
  const [focused, setFocused] = useState(false);
  const [enablePopover, setEnablePopover] = useState(false);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any, monacoInstance: any) => {
    editorRef.current = editor;

    editor.onDidFocusEditorWidget(() => {
      setFocused(true);
    });

    editor.onDidBlurEditorWidget(() => {
      setFocused(false);
    });
  };

  const PopoverContextTrigger = (e: KeyboardEvent) => {
    if (e.key === "{" && focused) {
      setEnablePopover(true);
    } else {
      setEnablePopover(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", PopoverContextTrigger);
    return () => {
      window.removeEventListener("keydown", PopoverContextTrigger);
    };
  }, [focused]);

  return (
    <Popover open={enablePopover}>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContext setIsOpen={setEnablePopover} />
    </Popover>
  );
};

export default IDEditor;
