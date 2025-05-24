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

  //   console.log("updatedStepBlock", updatedStepBlock);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        !_.isEqual(
          stepBlock.payload?.configuration,
          updatedStepBlock?.configuration
        )
      ) {
        //     console.log("updatedStepBlock", updatedStepBlock);
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

  const setStepBlock = (config: any) => {
    // console.log("config", config);
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
