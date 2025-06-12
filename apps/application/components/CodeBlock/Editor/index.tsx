"use client";
import React, { useEffect, useState } from "react";
import Output from "../Output";
import { Panel, PanelGroup } from "react-resizable-panels";
import PanelResizeHandleComp from "../../utils/PanelResizeHandle";
import { EditorHeader } from "./utils/EditorHeader";
import { TabsContent } from "@radix-ui/react-tabs";
import GetProject from "../../../actions/project";
import IDEeditor from "./IDEditor";
import { ApiTypeMapper } from "./utils/Mapper";
import {
  UpdatedStepBlockProvider,
  useUpdatedStepBlock,
} from "../../../contexts/codeblock";
import { SimpleLoader } from "@/components/loader";

type Props = {
  value?: any;
};
export type StepBlockInterface = {
  id: string;
  name: string;
  type: "python" | "javascript" | "graphql" | "postgres" | "rest";
  codeblock: string;
  configuration: { [key: string]: string };
  stdout: string;
  response: any;
  error: any;
};

const StepBlockEditor = ({ value }: any) => {
  const { setUpdatedStepBlock = () => {}, updatedStepBlock } =
    useUpdatedStepBlock() || {};

  useEffect(() => {
    if (value) {
      setUpdatedStepBlock(value);
    }
  }, [value]);

  return <>{updatedStepBlock && ApiTypeMapper()[updatedStepBlock.type]}</>;
};

const EditorCode = ({ value }: Props) => {
  const [activeStep, setActiveStep] = React.useState<StepBlockInterface>(value);
  const [renderEditor, setRenderEditor] = useState(false);

  const { data } = GetProject.getStep(value.id);

  useEffect(() => {
    if (data) {
      setActiveStep(data.payload);
      setRenderEditor(true);
    }
  }, [data]);

  return (
    <div className="w-full h-full">
      {/* {!activeStep && (
        <SimpleLoader className="flex h-full justify-center items-center mx-auto animate-spin" />
      )} */}
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={20} maxSize={100}>
          <div className="relative h-full items-center">
            <EditorHeader {...activeStep} />
            <UpdatedStepBlockProvider>
              {/* <StepBlockProvider initialvalue={activeStep}> */}

              {!renderEditor && <SimpleLoader />}
              {renderEditor && <StepBlockEditor value={activeStep} />}

              {/* </StepBlockProvider> */}
            </UpdatedStepBlockProvider>
          </div>
        </Panel>
        <PanelResizeHandleComp />
        <Panel defaultSize={50} minSize={20} maxSize={100}>
          <Output {...activeStep} />
        </Panel>
      </PanelGroup>
      {/* )} */}
    </div>
  );
};

export default EditorCode;
