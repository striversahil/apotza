"use client";
import { Skeleton } from "@repo/ui/skeleton";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  Cable,
  CirclePlus,
  PanelBottomClose,
  Trash,
  UnplugIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ComboPopAPI } from "../utils/PopOverSelect";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import GetProject from "../../../actions/project";
import DeleteTab from "./DeleteTab";
import { useCurrentTab } from "../../../contexts/codeblock";

type Props = {
  handleOpen: () => void;
  Open?: boolean;
  // BlockData: (data: any) => void;
};

const Tabs = (props: Props) => {
  const [CodeBlockData, setCodeBlockData] = useState<any>(null);

  const { data } = GetProject.getProject();

  const { currentTab, setCurrentTab = () => {} } = useCurrentTab() || {};

  useEffect(() => {
    if (data) {
      setCodeBlockData(data.payload.codeblocks);
    }
  }, [data]);

  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative flex h-[36px] mx-1 ">
      {CodeBlockData && (
        <div>
          <div className="relative flex flex-nowrap flex-1 items-center justify-start gap-2  overflow-x-scroll overflow-y-hidden bg-transparent">
            <div className="sticky left-0">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="bg-white/10 p-1 py-[5px]  rounded-md border border-white/20 cursor-pointer inline-flex items-center gap-2">
                    <CirclePlus size={20} />
                    <span className="font-bold text-sm whitespace-nowrap text-ellipsis">
                      Add New API
                    </span>
                  </div>
                </PopoverTrigger>
                <ComboPopAPI setOpen={setOpen} type="tab" codeBlock_id="" />
              </Popover>
            </div>
            {CodeBlockData.map((item: any, index: number) => (
              <div
                className={cn(
                  `flex min-w-[120px] bg-white/10 p-1 rounded-md border border-white/20 hover:bg-white/30  select-none cursor-pointer items-center gap-2`,
                  currentTab === item.id &&
                    "bg-white/20 font-bold text-blue-400 border-b-[3px] border-l-[3px] border-blue-700"
                )}
                key={index}
              >
                <div
                  className="flex flex-1   items-center gap-2"
                  onClick={() => setCurrentTab(item.id)}
                >
                  <UnplugIcon className="size-4 ml-1" />
                  <div className="flex-1 text-center text-sm whitespace-nowrap text-ellipsis">
                    {item.name}
                  </div>
                </div>
                <div className="ml-auto">
                  <DeleteTab
                    item={item}
                    onClick={() => {
                      currentTab &&
                        item.id === currentTab &&
                        setCurrentTab(null);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className={cn(
              "absolute top-0 right-2 cursor-pointer p-2 hover:bg-white/20 rounded-md duration-200",
              props.Open === false && "rotate-180 "
            )}
            onClick={props.handleOpen}
          >
            <PanelBottomClose />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
