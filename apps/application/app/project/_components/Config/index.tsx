"use client";
import React, { useEffect, useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import ConfigRoute from "./ConfigRoute";
import ProjectAction from "@/actions/project";
import { useComponent } from "../../../../contexts/component";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

type Props = {
  handleOpen: () => void;
  selectedItem?: any;
};

const CollapsiblePanels = ["appearance", "content", "layout", "payload"];

// Selected Component == Object Detect and pass as Value

const ConfigFolder = ({ handleOpen }: Props) => {
  const [Config, setConfig] = useState<any>(null);
  const { Component } = useComponent() || {};

  return (
    <div className="relative w-full h-full px-4 py-2 bg-slate-900 border-l border-slate-500 ">
      <div
        className="absolute z-50 top-2 right-0 p-2 bg-black/50 rounded-md cursor-pointer hover:bg-white/10"
        onClick={handleOpen}
      >
        <PanelRightClose />
      </div>
      <div className="flex flex-col gap-2">
        {Component &&
          Object.keys(Component).map(
            (item: any, index: number) =>
              CollapsiblePanels.includes(item) && (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="flex items-center gap-2">
                    <PanelRightClose />
                    <span>{item}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>{item}</CollapsibleContent>
                </Collapsible>
              )
          )}
      </div>
      {/* I will Set the Config route with that Object Access which to Rendered */}
    </div>
  );
};

export default ConfigFolder;
