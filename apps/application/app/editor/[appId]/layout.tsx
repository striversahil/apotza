"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return <div className="h-full">{props.children}</div>;
};

export default Layout;
