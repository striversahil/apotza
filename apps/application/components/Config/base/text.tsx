import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../../contexts";

type Props = {
  value: {
    config: string;
    value: string;
  };
  onChange: (value: any) => void;
  area?: boolean;
};

const Text_Base = ({ value, onChange, area }: Props) => {
  console.log("value", value);

  const { component, codeBlock } = useGlobalContext() || {};

  // const handleInput = () => {
  //   const editor = editorRef.current;
  //   if (!editor) return;

  //   let html = editor.innerHTML.length ? editor.innerHTML : value?.config || "";

  //   // Replace prop("Something") with a styled badge
  //   html = html.replace(/\{\{\s*([^"]+)\s*\}\}/g, (match, propText) => {
  //     return `<span contenteditable="false" class="inline-block text-center bg-blue-100 text-blue-700 border border-blue-400 px-1 py-0.5 rounded-lg text-sm ">{{${propText}}}</span> `;
  //   });

  //   onChange({ config: html, value: value?.value });

  //   editor.innerHTML = html;
  //   placeCaretAtEnd(editor);
  // };

  // const placeCaretAtEnd = (el: HTMLElement) => {
  //   // el.focus();
  //   const range = document.createRange();
  //   range.selectNodeContents(el);
  //   range.collapse(false);
  //   const sel = window.getSelection();
  //   sel?.removeAllRanges();
  //   sel?.addRange(range);
  // };

  // useEffect(() => {
  //   handleInput(); // Initial formatting if needed
  // }, [editorRef]);

  return (
    <div className="text-white">
      {area && (
        <Textarea
          value={value.value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-950 outline-none"
          typeof="text"
        />
      )}
      {!area && (
        <Input
          value={value.value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-950 outline-none"
          typeof="text"
        />
      )}
    </div>
  );
};

export default Text_Base;
