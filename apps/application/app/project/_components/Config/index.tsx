"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import ConfigRoute from "./ConfigRoute";
import ProjectAction from "@/actions/project";
import { useComponent } from "../../../../contexts/component";
import _, { set } from "lodash";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";
import appearance from "./MapRegistry/appearance.json";
import content from "./MapRegistry/content.json";
import layout from "./MapRegistry/layout.json";
import { MapComp } from "./MapRegistry/MapComp";

type Props = {
  handleOpen: () => void;
  selectedItem?: any;
};

const CollapsiblePanels = {
  appearance: appearance,
  content: content,
  layout: layout,
};

// Selected Component == Object Detect and pass as Value

interface ComponentType {
  [key: string]: {
    [key: string]: any;
  };
}

const ConfigFolder = ({ handleOpen }: Props) => {
  const [Config, setConfig] = useState<any>(null);
  const { Component } = useComponent() || {};
  const [State, setState] = useState<any>(null);

  useEffect(() => {
    const state = _.clone(Component);
    const value = _.mapValues(state, (value) => true);
    setState(value);
  }, [Component]);

  const handleTrigger = (item: string) => {
    setState((prev: any) => {
      return {
        ...prev,
        [item]: !prev[item],
      };
    });
  };

  return (
    <div className="relative w-full h-full p-2 bg-slate-900 border-l border-slate-500 ">
      <div
        className="absolute z-50 top-2 right-0 p-2 bg-black/50 rounded-md cursor-pointer hover:bg-white/10"
        onClick={handleOpen}
      >
        <PanelRightClose />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-2xl font-bold capitalize text-center ">
          {Component?.name}
        </h1>

        <div className="flex flex-col gap-3 mt-5">
          {Component &&
            State &&
            Object.keys(Component).map(
              (item: any, index: number) =>
                Object.keys(CollapsiblePanels).includes(item) &&
                Object.keys(Component[item]).length > 0 && (
                  <div key={index}>
                    <div
                      className="flex items-center gap-2 p-2 rounded-md bg-white/5 border border-white/20 cursor-pointer select-none"
                      onClick={() => handleTrigger(item)}
                    >
                      <span className="font-bold capitalize text-left flex-1">
                        {item}
                      </span>
                      <ChevronDown
                        className={cn(
                          "rotate-90 transition ease-in-out",
                          State[item] && "rotate-0"
                        )}
                      />
                    </div>
                    {State[item] && (
                      <div className="px-2">
                        {Object.keys(Component[item]).map(
                          (subitem: any, index: number) => (
                            <div key={index}>
                              {_.startCase(subitem)} :
                              {CollapsiblePanels[item]?.[subitem]}
                              {MapComp[
                                CollapsiblePanels[item]?.[
                                  subitem
                                ] as keyof typeof MapComp
                              ]?.({
                                location: [item, subitem],
                                initialvalue: Component[item][subitem],
                              })}
                              {/* {MapComp[subitem](Component[item][subitem])} */}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )
            )}
        </div>
      </div>
      {/* I will Set the Config route with that Object Access which to Rendered */}
    </div>
  );
};

export default ConfigFolder;
