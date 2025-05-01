import StepsBlockAction from "@/actions/project/stepsBlock";
import {
  useStepBlock,
  useUpdatedStepBlock,
} from "../../../../contexts/codeBlock";
import { useEffect } from "react";
import _ from "lodash";

/**
 * useStepConfig
 *
 * This hook will automatically save the step block config to the server when it changes with debounce.
 *
 * @returns an object with the current step block config and a function to update the step block config.
 */
export const useStepConfig = () => {
  const { stepBlock } = useStepBlock() || {};
  const { updatedStepBlock, setUpdatedStepBlock = () => {} } =
    useUpdatedStepBlock() || {};

  const { mutate } = StepsBlockAction.update(stepBlock?.id!);

  //   console.log("updatedStepBlock", updatedStepBlock);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!_.isEqual(stepBlock?.config, updatedStepBlock?.config)) {
        //     console.log("updatedStepBlock", updatedStepBlock);
        mutate({
          config: updatedStepBlock?.config,
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [updatedStepBlock]);

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
