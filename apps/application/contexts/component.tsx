import { createContext, useContext, useState, useMemo, useEffect } from "react";

interface ComponentContext {
  Component: any;
  setComponent: React.Dispatch<React.SetStateAction<any>>;
}

interface UpdatedComponentContext {
  UpdatedComponent: any;
  setUpdatedComponent: React.Dispatch<React.SetStateAction<any>>;
}

interface SectionContext {
  Section: any;
  setSection: React.Dispatch<React.SetStateAction<any>>;
}

const ComponentContext = createContext<ComponentContext | null>(null);
const UpdatedComponentContext = createContext<UpdatedComponentContext | null>(
  null
);
const SectionContext = createContext<SectionContext | null>(null);

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

export const SectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Section, setSection] = useState<any>(null);

  return (
    <SectionContext.Provider value={{ Section, setSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useComponent = () => useContext(ComponentContext);
export const useUpdatedComponent = () => useContext(UpdatedComponentContext);
export const useSection = () => useContext(SectionContext);
