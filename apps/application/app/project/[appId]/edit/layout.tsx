"use client";
import React from "react";
import { UtilityProvider } from "../../../../contexts/utils";
import {
  ComponentProvider,
  UpdatedComponentProvider,
} from "../../../../contexts/component";

type Props = {
  children: React.ReactNode;
};
const RootLayout = (props: Props) => {
  return (
    <div suppressHydrationWarning suppressContentEditableWarning>
      <ComponentProvider>
        <UpdatedComponentProvider>{props.children}</UpdatedComponentProvider>
        {/* <UtilityProvider></UtilityProvider> */}
      </ComponentProvider>
    </div>
  );
};

export default RootLayout;
