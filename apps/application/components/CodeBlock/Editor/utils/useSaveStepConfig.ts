import StepsBlockAction from "@/actions/project/stepsBlock";
import {
  useStepBlock,
  useUpdatedStepBlock,
} from "../../../../contexts/codeBlock";
import { useEffect } from "react";
import _ from "lodash";

export const useStepConfig = () => {
  const { stepBlock: initialStepBlock } = useStepBlock() || {};
  const { updatedStepBlock: stepBlock, setUpdatedStepBlock = () => {} } =
    useUpdatedStepBlock() || {};

  const { mutate } = StepsBlockAction.update(initialStepBlock?.id ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (_.isEqual(initialStepBlock?.config, stepBlock?.config)) {
        mutate(stepBlock?.config);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [stepBlock]);

  const stepConfig = {
    ...stepBlock?.config,
  };

  const setStepBlock = (config: any) => {
    setUpdatedStepBlock({ ...stepBlock, config });
  };

  return {
    stepConfig,
    setStepBlock,
  };
};
