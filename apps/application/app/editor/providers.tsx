"use client";
import React from "react";
import {
  ComponentProvider,
  LayoutProvider,
  PrevComponentProvider,
  UpdatedComponentProvider,
} from "../../contexts/component";
import { GlobalContextProvider } from "../../contexts/utils";

type Props = {
  children: React.ReactNode;
};
const Provider = (props: Props) => {
  return (
    <div suppressHydrationWarning suppressContentEditableWarning>
      <PrevComponentProvider>
        <ComponentProvider>
          <LayoutProvider>
            <UpdatedComponentProvider>
              <GlobalContextProvider>{props.children}</GlobalContextProvider>
            </UpdatedComponentProvider>
          </LayoutProvider>
          {/* <UtilityProvider></UtilityProvider> */}
        </ComponentProvider>
      </PrevComponentProvider>
    </div>
  );
};

export default Provider;
