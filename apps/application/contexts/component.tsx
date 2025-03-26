import { createContext, useContext, useState } from "react";

interface ComponentContext {
  Component: any;
}
const ComponentContext = createContext<ComponentContext | null>(null);

export const ComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Component, setComponent] = useState(null);
  return (
    <ComponentContext.Provider value={{ Component }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponent = () => useContext(ComponentContext);
