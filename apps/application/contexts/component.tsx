import { createContext, useContext, useEffect, useState } from "react";

interface ComponentContext {
  Component: any;
  setComponent: React.Dispatch<React.SetStateAction<any>>;
}
const ComponentContext = createContext<ComponentContext>(
  {} as ComponentContext
);

export const ComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    console.log(Component);
  },[Component])
  return (
    <ComponentContext.Provider value={{ Component, setComponent }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponent = () => useContext(ComponentContext);
