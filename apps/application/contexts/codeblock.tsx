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
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

type CurrentStep = {
  currentStep: string | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<string | null>>;
};

interface UpdatedStepBlockContext {
  updatedStepBlock: StepBlockInterface;
  setUpdatedStepBlock: React.Dispatch<React.SetStateAction<any>>;
}

const CurrentTabContext = createContext<CurrentTab | null>(null);

const CurrentStepContext = createContext<CurrentStep | null>(null);

const UpdatedStepBlockContext = createContext<UpdatedStepBlockContext | null>(
  null
);

export const CurrentTabProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<string>("");

  const { data: codeBlock } = GetProject.getProject();

  useEffect(() => {
    if (codeBlock && currentTab.length === 0) {
      setCurrentTab(codeBlock.payload.codeblocks[0].id);
    }
  }, [codeBlock]);

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

  const { data: stepBlocks } = GetProject.getStep(currentTab);

  useEffect(() => {
    if (stepBlocks && !currentStep) {
      setCurrentStep(stepBlocks.payload.stepBlocks[0].id);
    }
  }, [stepBlocks, currentTab]);

  return (
    <CurrentStepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </CurrentStepContext.Provider>
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
export const useUpdatedStepBlock = () => useContext(UpdatedStepBlockContext);
// setCurrentTab should set localstorage as well
