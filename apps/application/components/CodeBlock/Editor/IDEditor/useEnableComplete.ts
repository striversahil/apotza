import { useEffect, useState } from "react";

export const useEnableComplete = () => {
  const [focused, setFocused] = useState(false);
  const [enablePopover, setEnablePopover] = useState(false);

  const handleEditorDidMount = (editor: any, monacoInstance: any) => {
    editor.onDidFocusEditorWidget(() => {
      setFocused(true);
    });

    editor.onDidBlurEditorWidget(() => {
      setFocused(false);
    });
  };

  let last_key: string = "";

  const PopoverContextTrigger = (e: KeyboardEvent) => {
    if (last_key === "{" && e.key === "{" && focused) {
      setEnablePopover(true);
    } else {
      setEnablePopover(false);
    }
    last_key = e.key;
  };

  useEffect(() => {
    window.addEventListener("keydown", PopoverContextTrigger);
    return () => {
      window.removeEventListener("keydown", PopoverContextTrigger);
    };
  }, [focused]);

  return {
    enablePopover,
    handleEditorDidMount,
  };
};
