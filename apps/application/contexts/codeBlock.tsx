import { StepBlockInterface } from "@/components/CodeBlock/Editor";
import { createContext, ReactNode, useContext, useState } from "react";

interface CodeBlockContext {
  codeBlock: any | null;
  setCodeBlock: React.Dispatch<React.SetStateAction<any>>;
}
interface StepBlockContext {
  stepBlock: StepBlockInterface;
  setStepBlock: React.Dispatch<React.SetStateAction<any>>;
}
interface UpdatedStepBlockContext {
  updatedStepBlock: StepBlockInterface;
  setUpdatedStepBlock: React.Dispatch<React.SetStateAction<any>>;
}

const CodeBlockContext = createContext<CodeBlockContext | null>(null);

const StepBlockContext = createContext<StepBlockContext | null>(null);

const UpdatedStepBlockContext = createContext<UpdatedStepBlockContext | null>(
  null
);

export const CodeBlockProvider = ({ children }: { children: ReactNode }) => {
  const [codeBlock, setCodeBlock] = useState(null);
  return (
    <CodeBlockContext.Provider value={{ codeBlock, setCodeBlock }}>
      {children}
    </CodeBlockContext.Provider>
  );
};

export const StepBlockProvider = ({
  initialvalue,
  children,
}: {
  initialvalue: StepBlockInterface;
  children: ReactNode;
}) => {
  const [stepBlock, setStepBlock] = useState(initialvalue);
  return (
    <StepBlockContext.Provider value={{ stepBlock, setStepBlock }}>
      {children}
    </StepBlockContext.Provider>
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

export const useCodeBlock = () => useContext(CodeBlockContext);
export const useStepBlock = () => useContext(StepBlockContext);
export const useUpdatedStepBlock = () => useContext(UpdatedStepBlockContext);
