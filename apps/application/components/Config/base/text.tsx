import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../../contexts/utils";

type Props = {
  value: {
    config: string;
    value: string;
  };
  onChange: (value: any) => void;
  area?: boolean;
};

const Text_Base = ({ value, onChange, area }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const { component, codeBlock } = useGlobalContext() || {};

  const handleInput = () => {
    const editor = editorRef.current;
    if (!editor) return;

    let html = editor.innerHTML.length ? editor.innerHTML : value?.config || "";

    // Replace prop("Something") with a styled badge
    html = html.replace(/\{\{\s*([^"]+)\s*\}\}/g, (match, propText) => {
      return `<span contenteditable="false" class="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg text-sm mx-1">${propText}</span>`;
    });

    onChange({ config: html, value: value?.value });

    editor.innerHTML = html;
    placeCaretAtEnd(editor);
  };

  const placeCaretAtEnd = (el: HTMLElement) => {
    // el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  useEffect(() => {
    handleInput(); // Initial formatting if needed
  }, [editorRef]);

  return (
    <div className="text-white w-full bg-black">
      <div
        ref={editorRef}
        onInput={handleInput}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        className="flex h-10 w-full rounded-md border border-input bg-background px-5 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2  outline-none text-sm "
      ></div>
    </div>
  );
};

export default Text_Base;
