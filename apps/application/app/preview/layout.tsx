import Header from "@/components/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <main className="relative h-screen bg-slate-950 w-screen">
      <Header />
      {props.children}
    </main>
  );
};

export default layout;
