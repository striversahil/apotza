"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import GetProject from "@/actions/project";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/Tooltip/tooltip";
import { CardTitle } from "@repo/ui/card";
import ConfigHeader from "./header";
import { useComponent } from "../../contexts/component";

// type Props = {
//   handleOpen: () => void;
//   selectedItem?: any;
// };

export const CollapsiblePanels: any = {
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

const ConfigFolder = () => {
  const [Config, setConfig] = useState<any>(null);
  const { Component = {} } = useComponent() || ({} as any);
  const [State, setState] = useState<any>(null);

  useEffect(() => {
    const state = _.clone(Component);
    const value = _.mapValues(state, () => true);
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

  const PanelItem: React.FC<{
    item: string;
    subitem: string;
    index: number;
  }> = ({ item, subitem, index }) => {
    const value = CollapsiblePanels[item]?.[subitem];

    const initialvalue = useMemo(
      () => Component[item][subitem],
      [Component, item, subitem]
    );

    const ComponentToRender: any = MapComp({
      location: [item, subitem],
      initialvalue,
    });

    return (
      <Tooltip key={index}>
        <div className="flex items-center gap-2 select-none text-white/70 hover:text-white  duration-100 ">
          <TooltipTrigger className="text-sm font-bold ">
            {_.startCase(subitem)} :
          </TooltipTrigger>
          <div className="flex-1">{ComponentToRender[value]}</div>
        </div>
        <TooltipContent
          side="left"
          className="bg-slate-900 border rounded-xl shadow-lg"
        >
          Adjust {"   "}
          <span className="font-bold text-base mx-2 text-blue-500">
            {_.startCase(subitem)}
          </span>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className="relative w-full h-full px-2 border-l  border-slate-500 ">
      {!Component && (
        <div className="flex-1 flex items-center justify-center h-full ">
          <h1 className="text-white text-lg font-bold capitalize text-center space-y-2">
            Select
            <br />{" "}
            <span className="text-2xl text-blue-500 font-bold">
              Component 😉
            </span>{" "}
            <br />
            <span className="pt-5">to Start configuration</span>
          </h1>
        </div>
      )}
      {Component && (
        <div className="flex flex-col gap-2">
          <ConfigHeader value={Component} />
          <div className="flex flex-col gap-3 mt-5 pb-14">
            {State &&
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
                        <div className="p-2 flex flex-col gap-4 ">
                          {Object.keys(Component[item]).map(
                            (subitem: any, index: number) => (
                              <PanelItem
                                key={index}
                                item={item}
                                subitem={subitem}
                                index={index}
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )
              )}
          </div>
        </div>
      )}

      {/* I will Set the Config route with that Object Access which to Rendered */}
    </div>
  );
};

export default ConfigFolder;
