import React from "react";
import { CodeiumEditor as IDE } from "@codeium/react-code-editor";
import { useClickOutside } from "@mantine/hooks";
import StepsBlockAction from "../../../../actions/project/stepsBlock";
import GetProject from "@/actions/project";
import { Loader } from "lucide-react";

type Props = {
  language: string;
  code: string;
  onChange: (code: string) => void;
};

const IDEeditor = ({ code, onChange, language }: Props) => {
  // const { mutate } = StepsBlockAction.update(props.value?.id);

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
        defaultValue={code || ""}
        height={"100%"}
        onChange={(code) => onChange(code || "")}
        className=""
      />
      <div className="absolute w-14 h-full z-10 top-0 rounded-r-lg right-0 bg-[#1e1e1e]"></div>
    </div>
  );
};

export default IDEeditor;
