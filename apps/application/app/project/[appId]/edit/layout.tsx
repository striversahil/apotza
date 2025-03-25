"use client";
import React from "react";
import { UtilityProvider } from "../../../../contexts/utils";

type Props = {
  children: React.ReactNode;
};
const RootLayout = (props: Props) => {
  return (
    <div suppressHydrationWarning suppressContentEditableWarning>
      <UtilityProvider>{props.children}</UtilityProvider>
    </div>
  );
};

export default RootLayout;
