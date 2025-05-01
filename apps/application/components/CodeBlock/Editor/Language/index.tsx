import React from "react";
import { useStepBlock } from "../../../../contexts/codeBlock";
import { useStepConfig } from "../utils/useSaveStepConfig";

const LanguageConfig = () => {
  const { stepConfig, setStepBlock } = useStepConfig();
  return (
    <div>
      LanguageConfig{stepConfig?.code} {stepConfig?.type}
    </div>
  );
};

export default LanguageConfig;
