import React, { useEffect } from "react";
import { useStepBlock } from "../../../../contexts/codeBlock";
import { useStepConfig } from "../utils/useSaveStepConfig";

const LanguageConfig = () => {
  const { stepConfig, setStepBlock } = useStepConfig();

  useEffect(() => {
    console.log(stepConfig);
  });
  return (
    <div onClick={() => setStepBlock({ code: "hello" })}>
      LanguageConfig{stepConfig?.code} {stepConfig?.type}
    </div>
  );
};

export default LanguageConfig;
