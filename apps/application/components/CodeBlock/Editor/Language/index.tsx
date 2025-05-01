import React from "react";
import { useStepBlock } from "../../../../contexts/codeBlock";

const LanguageConfig = () => {
  const { stepBlock } = useStepBlock() || {};
  return (
    <div>
      LanguageConfig{stepBlock?.config.code} {stepBlock?.type}
    </div>
  );
};

export default LanguageConfig;
