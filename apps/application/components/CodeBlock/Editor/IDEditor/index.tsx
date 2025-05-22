import React, { useEffect, useRef, useState } from "react";
import { CodeiumEditor as IDE } from "@codeium/react-code-editor";
import { useEnableComplete } from "./useEnableComplete";
import { useConfigValue } from "./useConfigValue";
import PopoverContext from "@/components/PopoverContext";
import { useGlobalContext } from "../../../../contexts";

interface Text {
  config: string;
  value: string;
}

type Props = {
  language: string;
  code: Text;
  onChange: (code: Text) => void;
};

const IDEditor = ({ code, onChange, language }: Props) => {
  const { enablePopover, handleEditorDidMount } = useEnableComplete();

  const { codeBlock } = useGlobalContext() || {};
  console.log("codeBlock", codeBlock);

  const { setConfig } = useConfigValue(onChange);

  return (
    <div className="relative w-[100%] overscroll-auto h-full rounded-lg overflow-hidden">
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
        defaultValue={code.config || ""}
        height={"100%"}
        options={{
          fontSize: 14,
          fontFamily: "Consolas, 'Courier New', monospace",
        }}
        onChange={(code) => setConfig(code || "")}
        className=""
      />
      {/* For Removing the Right Codeium Icon */}
      <div className="absolute w-14 h-full z-10 top-0 rounded-r-lg right-0 bg-[#1e1e1e]"></div>

      {enablePopover && (
        <div className="absolute  top-1/2 left-1/3 right-0 ">
          <PopoverContext />
        </div>
      )}
    </div>
  );
};

export default IDEditor;
