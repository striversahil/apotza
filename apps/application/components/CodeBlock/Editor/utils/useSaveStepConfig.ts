import StepsBlockAction from "@/actions/project/stepsBlock";

import { useEffect } from "react";
import _ from "lodash";
import GetProject from "@/actions/project";
import { useUpdatedStepBlock } from "../../../../contexts/codeblock";

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
  const { data: stepBlock } = GetProject.getStep(updatedStepBlock?.id!);

  const { mutate } = StepsBlockAction.update(updatedStepBlock?.id!);

  // Debounce the update to the step block configuration
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        !_.isEqual(
          stepBlock.payload?.configuration,
          updatedStepBlock?.configuration
        )
      ) {
        console.log(updatedStepBlock);
        mutate({
          configuration: updatedStepBlock?.configuration,
        });
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [updatedStepBlock]);

  const stepConfig = {
    ...stepBlock?.payload,
  };

  // Function to update the step block configuration
  // This will be used in the UI to update the step block configuration
  const setStepBlock = (config: any) => {
    setUpdatedStepBlock((prev: any) => ({
      ...prev,
      configuration: { ...prev.configuration, ...config },
    }));
  };

  return {
    stepConfig,
    setStepBlock,
  };
};
