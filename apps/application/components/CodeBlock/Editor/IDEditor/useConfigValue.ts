import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../../../contexts";
import {
  TabStepOutputProvider,
  useTabStepOutput,
} from "../../../../contexts/codeblock";

// It will have Simple Job to set the value based on config of Text

interface Text {
  config: string;
  value: string;
}

export const useConfigValue = (setValue: (code: Text) => void) => {
  const [configText, setConfigText] = useState<string>("");
  const { codeBlock, component } = useGlobalContext() || {};

  const { steps } = useTabStepOutput() || {};

  const setConfig = (config_string: string) => {
    setConfigText(config_string);

    const regex = /\{\{(.*?)\}\}/g; // regex to match "{{something}}"
    const text = config_string;

    // const text = 'Hello {{world}} and {{universe}}!';
    const result = text.replace(regex, (match, p1) => {
      return `${p1.toUpperCase()}`; // Or whatever transformation you want!
    });
    setValue({ config: config_string, value: result });
  };

  return {
    setConfig,
  };
};
