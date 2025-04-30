"use client";
import GetProject from "@/actions/project";
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

const CurrentTabContext = createContext<CurrentTab | null>(null);

const CurrentStepContext = createContext<CurrentStep | null>(null);

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

export const useCurrentTab = () => useContext(CurrentTabContext);
export const useCurrentStep = () => useContext(CurrentStepContext);
// setCurrentTab should set localstorage as well
