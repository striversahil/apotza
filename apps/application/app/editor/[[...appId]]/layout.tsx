"use client";
import React from "react";
import { UtilityProvider } from "../../../../contexts/utils";
import {
  ComponentProvider,
  PrevComponentProvider,
  UpdatedComponentProvider,
} from "../../../../contexts/component";

type Props = {
  children: React.ReactNode;
};
const RootLayout = (props: Props) => {
  return (
    <div suppressHydrationWarning suppressContentEditableWarning>
      <PrevComponentProvider>
        <ComponentProvider>
          <UpdatedComponentProvider>{props.children}</UpdatedComponentProvider>
          {/* <UtilityProvider></UtilityProvider> */}
        </ComponentProvider>
      </PrevComponentProvider>
    </div>
  );
};

export default RootLayout;
