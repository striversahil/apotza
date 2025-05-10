"use client";
import GetProject from "@/actions/project";
import { StepBlockInterface } from "@/components/CodeBlock/Editor";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CurrentTab = {
  currentTab: string | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<string | null>>;
};

type TabStepOutputContext = {
  steps: Array<StepBlockInterface>;
  setSteps: React.Dispatch<React.SetStateAction<Array<StepBlockInterface>>>;
};

type CurrentStep = {
  currentStep: string | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<string | null>>;
};

interface UpdatedStepBlockContext {
  updatedStepBlock: StepBlockInterface;
  setUpdatedStepBlock: React.Dispatch<React.SetStateAction<any>>;
}

// Context for current tab
const CurrentTabContext = createContext<CurrentTab | null>(null);

// Context for current step
const CurrentStepContext = createContext<CurrentStep | null>(null);

// Deciding for Codeblock Context for each codeblock to use {{ auto complete }}
const TabStepOutputContext = createContext<TabStepOutputContext | null>(null);

// Context for verifying changes in updated and current step
const UpdatedStepBlockContext = createContext<UpdatedStepBlockContext | null>(
  null
);

export const CurrentTabProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<string | null>(null);

  const { data: codeBlock } = GetProject.getProject();

  useEffect(() => {
    if (codeBlock && !currentTab) {
      setCurrentTab(codeBlock.payload?.codeblocks[0]?.id);
    }
  }, [codeBlock, currentTab]);

  return (
    <CurrentTabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </CurrentTabContext.Provider>
  );
};

export const CurrentStepProvider = ({
  currentTab,
  children,
}: {
  currentTab: string;
  children: ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  // const { data: stepBlocks } = GetProject.getStep(currentTab);

  // useEffect(() => {
  //   if (stepBlocks && !currentStep) {
  //     setCurrentStep(stepBlocks.payload?.stepBlocks[0]?.id);
  //   }
  // }, [stepBlocks, currentStep]);

  // useEffect(() => {
  //   if (stepBlocks && !currentStep) {
  //     setCurrentStep(stepBlocks.payload.stepBlocks[0].id);
  //   }
  // }, [currentTab]);

  return (
    <CurrentStepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </CurrentStepContext.Provider>
  );
};

export const TabStepOutputProvider = ({
  id = "",
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const [steps, setSteps] = useState<Array<StepBlockInterface>>([]);

  const { data } = GetProject.getContextCodeBlock(id);

  useEffect(() => {
    if (data) {
      setSteps(data);
    }
  }, [id, data]);

  return (
    <TabStepOutputContext.Provider value={{ steps, setSteps }}>
      {children}
    </TabStepOutputContext.Provider>
  );
};

export const UpdatedStepBlockProvider = ({
  initialvalue,
  children,
}: {
  initialvalue: StepBlockInterface;
  children: ReactNode;
}) => {
  const [updatedStepBlock, setUpdatedStepBlock] = useState(initialvalue);
  return (
    <UpdatedStepBlockContext.Provider
      value={{ updatedStepBlock, setUpdatedStepBlock }}
    >
      {children}
    </UpdatedStepBlockContext.Provider>
  );
};

export const useCurrentTab = () => useContext(CurrentTabContext);
export const useCurrentStep = () => useContext(CurrentStepContext);
export const useTabStepOutput = () => useContext(TabStepOutputContext);
export const useUpdatedStepBlock = () => useContext(UpdatedStepBlockContext);
// setCurrentTab should set localstorage as well
