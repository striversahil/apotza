import React, { useEffect } from "react";

type Props = {
  ref: React.RefObject<HTMLDivElement>;
  value: string;
  onChange: (value: string) => void;
};

export const useAutoComplete = ({ ref, value, onChange }: Props) => {
  const handleInput = () => {
    const editor = ref.current;
    if (!editor) return;

    let html = editor.innerHTML ? editor.innerHTML : value || "";

    onChange(html);

    // Replace prop("Something") with a styled badge
    html = html.replace(/\{\{\s*([^"]+)\s*\}\}/g, (match, propText) => {
      return `<span contenteditable="false" class="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg text-sm mx-1">${propText}</span>`;
    });

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
  }, [ref, value]);
  return {
    handleInput,
  };
};
