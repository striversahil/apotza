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
  currentStep: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>;
};

const CurrentTabContext = createContext<CurrentTab | null>(null);

export const CurrentTabProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<string>("");

  const { data: codeBlock } = GetProject.getProject();
  const { data: stepBlocks } = GetProject.getStep(currentTab);

  useEffect(() => {
    if (codeBlock && currentTab.length === 0) {
      setCurrentTab(codeBlock.payload.codeblocks[0].id);
    }
  }, [codeBlock]);

  useEffect(() => {
    if (stepBlocks && currentStep.length === 0) {
      setCurrentStep(stepBlocks.payload.stepBlocks[0].id);
    }
  }, [stepBlocks]);

  return (
    <CurrentTabContext.Provider
      value={{ currentTab, setCurrentTab, currentStep, setCurrentStep }}
    >
      {children}
    </CurrentTabContext.Provider>
  );
};

export const useCurrentTab = () => useContext(CurrentTabContext);
// setCurrentTab should set localstorage as well
