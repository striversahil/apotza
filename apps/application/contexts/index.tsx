import { createContext, ReactNode, useContext, useState } from "react";

interface GlobalContext {
  component: any | null;
  codeBlock: any | null;
  setComponent: React.Dispatch<React.SetStateAction<any>>;
  setCodeBlock: React.Dispatch<React.SetStateAction<any>>;
}

const GlobalContext = createContext<GlobalContext | null>(null);

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

export const useGlobalContext = () => useContext(GlobalContext);
