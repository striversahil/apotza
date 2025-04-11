import { createContext, useContext, useState, useMemo, useEffect } from "react";

interface ComponentContext {
  Component: any;
  setComponent: React.Dispatch<React.SetStateAction<any>>;
}

interface UpdatedComponentContext {
  UpdatedComponent: any;
  setUpdatedComponent: React.Dispatch<React.SetStateAction<any>>;
}

interface layoutContext {
  Layout: any;
  setLayout: React.Dispatch<React.SetStateAction<any>>;
}

interface PrevComponentContext {
  prevComponent: any;
  setPrevComponent: React.Dispatch<React.SetStateAction<any>>;
}

const ComponentContext = createContext<ComponentContext | null>(null);
const UpdatedComponentContext = createContext<UpdatedComponentContext | null>(
  null
);
const LayoutContext = createContext<layoutContext | null>(null);

const PrevComponentContext = createContext<PrevComponentContext | null>(null);

export const ComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Component, setComponent] = useState<any>(null);

  return (
    <ComponentContext.Provider value={{ Component, setComponent }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const UpdatedComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [UpdatedComponent, setUpdatedComponent] = useState<any>(null);

  return (
    <UpdatedComponentContext.Provider
      value={{ UpdatedComponent, setUpdatedComponent }}
    >
      {children}
    </UpdatedComponentContext.Provider>
  );
};

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [Layout, setLayout] = useState<any>(null);

  return (
    <LayoutContext.Provider value={{ Layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const PrevComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [prevComponent, setPrevComponent] = useState<any>(null);

  return (
    <PrevComponentContext.Provider value={{ prevComponent, setPrevComponent }}>
      {children}
    </PrevComponentContext.Provider>
  );
};

export const useComponent = () => useContext(ComponentContext);
export const useUpdatedComponent = () => useContext(UpdatedComponentContext);
export const useLayout = () => useContext(LayoutContext);
export const usePrevComponent = () => useContext(PrevComponentContext);
