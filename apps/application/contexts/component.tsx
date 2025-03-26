import { createContext, useContext, useEffect, useState } from "react";

interface ComponentContext {
  Component: any;
  setComponent: React.Dispatch<React.SetStateAction<any>>;
  UpdatedComponent: any;
  setUpdatedComponent: React.Dispatch<React.SetStateAction<any>>;
}
const ComponentContext = createContext<ComponentContext>(
  {} as ComponentContext
);

export const ComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Component, setComponent] = useState<any>(null); // This will Inherit the Original Component State for *Comparison*
  const [UpdatedComponent, setUpdatedComponent] = useState<any>(null); // I will Update This for Realtime Changes

  useEffect(() => {
    if (Component) {
      setUpdatedComponent(Component);
    }
  }, [Component]);
  return (
    <ComponentContext.Provider
      value={{ Component, setComponent, UpdatedComponent, setUpdatedComponent }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponent = () => useContext(ComponentContext);
