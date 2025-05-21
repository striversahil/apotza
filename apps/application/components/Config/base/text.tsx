import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { MentionsInput, Mention } from "react-mentions";
import React, { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (value: any) => void;
  area?: boolean;
};

const Text_Base = ({ value, onChange, area }: Props) => {
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
      <Input
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />

      {/* <MentionsInput
        // value={value}
        defaultValue={value}
        onChange={onChange}
        style={{
          control: {
            backgroundColor: "#fff",
            fontSize: 16,
            fontWeight: "normal",
          },
          highlighter: {
            overflow: "hidden",
          },
          input: {
            margin: 0,
          },
          suggestions: {
            list: {
              backgroundColor: "white",
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: 14,
            },
            item: {
              padding: "5px 15px",
              borderBottom: "1px solid #ddd",
              "&focused": {
                backgroundColor: "#e6f7ff",
              },
            },
          },
          // mention: {
          //   backgroundColor: "#d2f8d2",
          //   padding: "3px 5px",
          //   borderRadius: "4px",
          // },
        }}
        // markup="{{__id__}}" // 🧠 This tells the lib how to format the inserted value
        singleLine={area ? true : false}
      >
        <div></div>
        <Mention
          trigger="@"
          data={["John", "Doe", "Jane", "Doe", "John", "Doe", "Jane", "Doe"]}
        />
      </MentionsInput> */}
    </div>
  );
};

export default Text_Base;
