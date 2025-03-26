"use client";
import React from "react";
import { UtilityProvider } from "../../../../contexts/utils";
import { ComponentProvider } from "../../../../contexts/component";

type Props = {
  children: React.ReactNode;
};
const RootLayout = (props: Props) => {
  return (
    <div suppressHydrationWarning suppressContentEditableWarning>
      <ComponentProvider>
        <UtilityProvider>{props.children}</UtilityProvider>
      </ComponentProvider>
    </div>
  );
};

export default RootLayout;
