"use client";
import React, { useEffect, useState } from "react";
import { Tabs as TabRoot, TabsContent } from "@radix-ui/react-tabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import EditorCode from "../Editor";
import GetProject from "../../../actions/project";
import HeaderChange from "../Tab/HeaderChange";
import InStepPopOver from "./InStepPopOver";
import { LoaderPinwheel } from "lucide-react";
import Loader from "../loader";
import { useCurrentStep } from "../../../contexts/codeblock";

type Props = {
  value?: any;
};

const StepEditorRoot = ({ value }: Props) => {
  // const [currentStep, setCurrentStep] = useState("");
  const [codeBlock, setCodeBlock] = useState<any>(value);
  const [renderStep, setRenderStep] = useState(false);

  const { data } = GetProject.getCodeBlock(value.id);

  const { currentStep, setCurrentStep = () => {} } = useCurrentStep() || {};

  // console.log("currentStep", currentStep);

  useEffect(() => {
    if (data) {
      setCurrentStep(data.payload.stepBlocks[0].id);
      setCodeBlock(data.payload);
      setRenderStep(true);
    }
  }, [data]);
  // const currentStep = codeBlock.steps[0]?._id;

  return (
    <div className="w-full h-full">
      <PanelGroup direction="horizontal" className="">
        <Panel defaultSize={20} minSize={20} maxSize={50}>
          <HeaderChange value={codeBlock} />
          <div className=" border-r border-slate-500 bg-white/5 w-full h-full">
            <div className="relative w-full h-full">
              <div className="flex flex-col overflow-y-scroll items-center justify-start w-full h-full gap-2 p-2 pb-[100px]">
                {renderStep &&
                  codeBlock.stepBlocks.map((item: any, index: number) => (
                    <div key={index} className="w-full">
                      <InStepPopOver
                        value={item}
                        key={index}
                        codeBlock_id={value.id}
                      />
                    </div>
                  ))}
              </div>
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
          {renderStep &&
            codeBlock.stepBlocks.map((item: any, index: number) => (
              <React.Fragment key={index}>
                {item.id === currentStep && (
                  <EditorCode value={item} key={index} />
                )}
              </React.Fragment>
            ))}
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default StepEditorRoot;
