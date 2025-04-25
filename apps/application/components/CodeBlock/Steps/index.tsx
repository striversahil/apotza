"use client";
import React, { useEffect, useState } from "react";
import { Tabs as TabRoot, TabsContent } from "@radix-ui/react-tabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import EditorCode from "../Editor";
import ProjectAction from "../../../actions/project";
import HeaderChange from "../Tab/HeaderChange";
import InStepPopOver from "./InStepPopOver";
import { LoaderPinwheel } from "lucide-react";
import Loader from "../loader";

type Props = {
  value?: any;
};

const StepEditorRoot = (props: Props) => {
  // const [currentStep, setCurrentStep] = useState("");
  const [codeBlock, setCodeBlock] = useState<any>(null);

  const { data } = ProjectAction.getCodeBlock(props.value.id);

  useEffect(() => {
    if (data) {
      setCodeBlock(data.payload);
    }
  }, [data]);
  // const currentStep = codeBlock.steps[0]?._id;

  return (
    <div className="w-full h-full">
      {!codeBlock && <Loader />}
      {codeBlock && (
        <TabRoot
          className="w-full h-full"
          defaultValue={codeBlock.stepBlocks[0]?.id}
        >
          <PanelGroup direction="horizontal" className="">
            <Panel defaultSize={20} minSize={20} maxSize={50}>
              <HeaderChange value={codeBlock} />
              <div className=" border-r border-slate-500 w-full h-full">
                <div className="w-full h-full">
                  <TabsList className="flex flex-col overflow-y-scroll items-center justify-start w-full h-full gap-2 p-2">
                    {codeBlock.stepBlocks.map((item: any, index: number) => (
                      <div key={index} className="w-full">
                        <InStepPopOver
                          value={item}
                          key={index}
                          codeBlock_id={props.value.id}
                        />
                      </div>
                    ))}
                  </TabsList>
                  {/* {props.value.steps.length === 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className=" flex flex-col justify-center items-center cursor-pointer bg-white/20 rounded-lg px-5">
              Click to Add First API
              <PlusCircle className=" size-6 duration-200 active:rotate-90" />
            </PopoverTrigger>
            <ComboPopAPI setOpen={setOpen} _id={props.value._id} />
          </Popover>
        )} */}
                </div>
              </div>
            </Panel>
            <PanelResizeHandle className="p-[1px] cursor-row-resize hover:bg-blue-500" />
            <Panel defaultSize={80} minSize={20} maxSize={80}>
              {codeBlock.stepBlocks.map((item: any, index: number) => (
                <TabsContent
                  value={item.id}
                  className="w-full h-full"
                  key={index}
                >
                  <EditorCode value={item} />
                </TabsContent>
              ))}
            </Panel>
          </PanelGroup>
        </TabRoot>
      )}
    </div>
  );
};

export default StepEditorRoot;
