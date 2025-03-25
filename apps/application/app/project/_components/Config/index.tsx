"use client";
import React, { useEffect, useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import ConfigRoute from "./ConfigRoute";
import ProjectAction from "@/actions/project";

type Props = {
  handleOpen: () => void;
  selectedItem?: any;
};

// Selected Component == Object Detect and pass as Value

const ConfigFolder = ({ handleOpen }: Props) => {
  const [Sections, setSections] = useState<any>([]);
  const { isLoading, data } = ProjectAction.getProject();

  useEffect(() => {
    if (data) {
      setSections(data.payload.sections);
    }
  }, [data]);

  return (
    <div className="relative w-full h-full bg-slate-900 border-l border-slate-500 ">
      <div
        className="absolute z-50 top-2 right-0 p-2 bg-black/50 rounded-md cursor-pointer hover:bg-white/10"
        onClick={handleOpen}
      >
        <PanelRightClose />
      </div>
      <div className="flex flex-col gap-2">
        {Sections.map((item: any, index: number) => (
          <div key={index}>
            <ConfigRoute value={item} />
          </div>
        ))}
      </div>
      {/* I will Set the Config route with that Object Access which to Rendered */}
    </div>
  );
};

export default ConfigFolder;
