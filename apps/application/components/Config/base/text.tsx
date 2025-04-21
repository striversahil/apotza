import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import React, { useRef } from "react";
import { useGlobalContext } from "../../../contexts/utils";
import { useAutoComplete } from "./autocomplete";

type Props = {
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
};

const Text_Base = ({ value, onChange, area }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const { component, codeBlock } = useGlobalContext() || {};

  const { handleInput } = useAutoComplete({ ref: editorRef, value, onChange });

  return (
    <div className="text-white w-full p-4 bg-black">
      <div
        ref={editorRef}
        onInput={handleInput}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50w-full outline-none text-sm "
      ></div>
    </div>
  );
};

export default Text_Base;
