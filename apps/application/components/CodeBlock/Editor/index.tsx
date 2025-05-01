"use client";
import React, { useEffect, useState } from "react";
import Output from "../Output";
import { Panel, PanelGroup } from "react-resizable-panels";
import PanelResizeHandleComp from "../../utils/PanelResizeHandle";
import { EditorHeader } from "./EditorHeader";
import { TabsContent } from "@radix-ui/react-tabs";
import GetProject from "../../../actions/project";
import IDEeditor from "./IDEditor";
import { Loader } from "lucide-react";

type Props = {
  value?: any;
};

const EditorCode = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState<any>(null);

  const { data } = GetProject.getStep(props.value.id);

  useEffect(() => {
    if (data) {
      setActiveStep(data.payload);
    }
  }, [data]);

  return (
    <div className="w-full h-full">
      {!activeStep && (
        <Loader className="flex h-full justify-center items-center mx-auto animate-spin" />
      )}
      {activeStep && (
        <PanelGroup direction="vertical">
          <Panel defaultSize={50} minSize={20} maxSize={100}>
            <div className="relative h-full items-center">
              <EditorHeader value={activeStep} />
              <IDEeditor value={activeStep} />
            </div>
          </Panel>
          <PanelResizeHandleComp />
          <Panel defaultSize={50} minSize={20} maxSize={100}>
            <Output value={activeStep} />
          </Panel>
        </PanelGroup>
      )}
    </div>
  );
};

export default EditorCode;
