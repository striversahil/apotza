import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../../../contexts";

interface Text {
  config: string;
  value: string;
}

// It will have Simple Job to set the value based on config of Text

export const useConfigValue = (onChange: (code: Text) => void) => {
  const { codeBlock, component } = useGlobalContext() || {};

  const setConfig = (config_string: string) => {
    const regex = /\{\{(.*?)\}\}/g; // regex to match "{{something}}"
    const text = config_string;

    // const text = 'Hello {{world}} and {{universe}}!';
    const result = text.replace(regex, (match, p1) => {
      return `🌟${p1.toUpperCase()}🌟`; // Or whatever transformation you want!
    });
    onChange({ config: config_string, value: result });
  };

  return {
    setConfig,
  };
};
