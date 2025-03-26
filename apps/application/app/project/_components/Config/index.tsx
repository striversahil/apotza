"use client";
import React, { useEffect, useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import ConfigRoute from "./ConfigRoute";
import ProjectAction from "@/actions/project";
import { useComponent } from "../../../../contexts/component";

type Props = {
  handleOpen: () => void;
  selectedItem?: any;
};

// Selected Component == Object Detect and pass as Value

const ConfigFolder = ({ handleOpen }: Props) => {
  const [Config, setConfig] = useState<any>(null);
  const { Component } = useComponent() || {};
  const { isLoading, data, refetch } = ProjectAction.getComponent(Component);

  useEffect(() => {
    if (Component) {
      // console.log("Component", Component);
      refetch();

      if (data) {
        console.log("data", data);
        setConfig(data.payload);
      }
    }
  }, [data, Component]);

  return (
    <div className="relative w-full h-full px-4 py-2 bg-slate-900 border-l border-slate-500 ">
      <div
        className="absolute z-50 top-2 right-0 p-2 bg-black/50 rounded-md cursor-pointer hover:bg-white/10"
        onClick={handleOpen}
      >
        <PanelRightClose />
      </div>
      <div className="flex flex-col gap-2">
        {Config &&
          Object.keys(Config).map((item: any, index: number) => (
            <div key={index}>
              <ConfigRoute value={Config[item]} />
            </div>
          ))}
      </div>
      {/* I will Set the Config route with that Object Access which to Rendered */}
    </div>
  );
};

export default ConfigFolder;
