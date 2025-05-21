import React from "react";
import { useGlobalContext } from "../../contexts";

const PopoverContext = () => {
  const { codeBlock, component } = useGlobalContext() || {};

  return (
    <div className="flex rounded-lg flex-col w-14 h-fit z-10 bg-black">
      {JSON.stringify(codeBlock)}
      {JSON.stringify(component)}
    </div>
  );
};

export default PopoverContext;
