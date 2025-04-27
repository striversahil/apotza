import React, { createContext, useState, useContext, ReactNode } from "react";

interface UtilContext {
  currentTab: number;
  toggleTab: (tabno: number) => void;
  currentStep: number;
  toggleStep: (stepno: number) => void;
}
interface GlobalContext {
  component: any | null;
  codeBlock: any | null;
  setComponent: React.Dispatch<React.SetStateAction<any>>;
  setCodeBlock: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context
const UtilsContext = createContext<UtilContext | null>(null);

const GlobalContext = createContext<GlobalContext | null>(null);

// Create a provider component
export const UtilityProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setcurrentTab] = useState(0);
  const [currentStep, setcurrentStep] = useState(0);

  const toggleTab = (tabno: number) => {
    setcurrentTab(tabno);
  };

  const toggleStep = (stepno: number) => {
    setcurrentStep(stepno);
  };

  return (
    <UtilsContext.Provider
      value={{ currentTab, toggleTab, currentStep, toggleStep }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [codeBlock, setCodeBlock] = useState(null);
  const [component, setComponent] = useState(null);
  return (
    <GlobalContext.Provider
      value={{ component, codeBlock, setCodeBlock, setComponent }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to use the context
export const useGlobalContext = () => useContext(GlobalContext);

export const useUtility = () => useContext(UtilsContext);
