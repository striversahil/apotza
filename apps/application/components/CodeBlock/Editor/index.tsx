"use client";
import React, { useEffect, useState } from "react";
import Output from "../Output";
import { Panel, PanelGroup } from "react-resizable-panels";
import PanelResizeHandleComp from "../../utils/PanelResizeHandle";
import { EditorHeader } from "./utils/EditorHeader";
import { TabsContent } from "@radix-ui/react-tabs";
import GetProject from "../../../actions/project";
import IDEeditor from "./IDEditor";
import { Loader } from "lucide-react";
import { ApiTypeMapper } from "./utils/Mapper";
import {
  StepBlockProvider,
  UpdatedStepBlockProvider,
} from "../../../contexts/codeBlock";

type Props = {
  value?: any;
};
export type StepBlockInterface = {
  id: string;
  name: string;
  type: "python" | "javascript" | "graphql" | "postgres" | "rest";
  codeblock: string;
  config: { [key: string]: string };
  stdout: string;
  output: any;
  request: string;
};

const EditorCode = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState<StepBlockInterface | null>(
    null
  );

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
              <EditorHeader {...activeStep} />
              <UpdatedStepBlockProvider initialvalue={activeStep}>
                {/* <StepBlockProvider initialvalue={activeStep}> */}
                {ApiTypeMapper()[activeStep.type]}
                {/* </StepBlockProvider> */}
              </UpdatedStepBlockProvider>
            </div>
          </Panel>
          <PanelResizeHandleComp />
          <Panel defaultSize={50} minSize={20} maxSize={100}>
            <Output {...activeStep} />
          </Panel>
        </PanelGroup>
      )}
    </div>
  );
};

export default EditorCode;
