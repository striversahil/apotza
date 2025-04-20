import { createContext, useContext, useState, useMemo, useEffect } from "react";

export interface ComponentInterface {
  id: string;
  type: string;
  section?: string;
  component_id?: string;
  component?: string;
  page?: string;
  layout?: any;
  appearance?: any;
  components?: any;
}

interface ComponentContext {
  Component: ComponentInterface | null;
  setComponent: React.Dispatch<React.SetStateAction<ComponentInterface | null>>;
}

interface UpdatedComponentContext {
  UpdatedComponent: ComponentInterface | null;
  setUpdatedComponent: React.Dispatch<
    React.SetStateAction<ComponentInterface | null>
  >;
}

interface layoutContext {
  Layout: number | null;
  setLayout: React.Dispatch<React.SetStateAction<number | null>>;
}

interface PrevComponentContext {
  prevComponent: ComponentInterface | null;
  setPrevComponent: React.Dispatch<
    React.SetStateAction<ComponentInterface | null>
  >;
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
  const [Component, setComponent] = useState<ComponentInterface | null>(null);

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
  const [UpdatedComponent, setUpdatedComponent] =
    useState<ComponentInterface | null>(null);

  return (
    <UpdatedComponentContext.Provider
      value={{ UpdatedComponent, setUpdatedComponent }}
    >
      {children}
    </UpdatedComponentContext.Provider>
  );
};

export const PrevComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [prevComponent, setPrevComponent] = useState<ComponentInterface | null>(
    null
  );

  return (
    <PrevComponentContext.Provider value={{ prevComponent, setPrevComponent }}>
      {children}
    </PrevComponentContext.Provider>
  );
};

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [Layout, setLayout] = useState<number | null>(null);
  return (
    <LayoutContext.Provider value={{ Layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useComponent = () => useContext(ComponentContext);
export const useUpdatedComponent = () => useContext(UpdatedComponentContext);
export const usePrevComponent = () => useContext(PrevComponentContext);
export const useLayout = () => useContext(LayoutContext);
