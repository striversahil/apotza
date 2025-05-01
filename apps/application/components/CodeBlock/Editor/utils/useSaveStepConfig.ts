import StepsBlockAction from "@/actions/project/stepsBlock";

export const useSaveStepConfig = (id: string) => {
  const { mutate } = StepsBlockAction.update(id);

  return () => {};
};
