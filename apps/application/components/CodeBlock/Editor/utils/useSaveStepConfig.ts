import StepsBlockAction from "@/actions/project/stepsBlock";
import {
  useStepBlock,
  useUpdatedStepBlock,
} from "../../../../contexts/codeBlock";
import { useEffect } from "react";
import _ from "lodash";
import GetProject from "@/actions/project";

/**
 * useStepConfig
 *
 * This hook will automatically save the step block config to the server when it changes with debounce.
 *
 * @returns an object with the current step block config and a function to update the step block config.
 */
export const useStepConfig = () => {
  const { updatedStepBlock, setUpdatedStepBlock = () => {} } =
    useUpdatedStepBlock() || {};
  const { data : stepBlock } = GetProject.getStep(updatedStepBlock?.id!);

  const { mutate } = StepsBlockAction.update(updatedStepBlock?.id!);

  //   console.log("updatedStepBlock", updatedStepBlock);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!_.isEqual(stepBlock.payload?.config, updatedStepBlock?.config)) {
        //     console.log("updatedStepBlock", updatedStepBlock);
        mutate({
          config: updatedStepBlock?.config,
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [updatedStepBlock]);

  const stepConfig = {
    ...stepBlock?.payload.config,
  };

  const setStepBlock = (config: any) => {
    setUpdatedStepBlock({ ...stepBlock?.payload, config });
  };

  return {
    stepConfig,
    setStepBlock,
  };
};
