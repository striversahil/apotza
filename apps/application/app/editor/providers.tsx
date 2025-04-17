"use client";
import React from "react";
import {
  ComponentProvider,
  LayoutProvider,
  PrevComponentProvider,
  UpdatedComponentProvider,
} from "../../contexts/component";

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
              {props.children}
            </UpdatedComponentProvider>
          </LayoutProvider>
          {/* <UtilityProvider></UtilityProvider> */}
        </ComponentProvider>
      </PrevComponentProvider>
    </div>
  );
};

export default Provider;
