"use client";
import React, { useEffect, useState } from "react";
import Output from "../Output";
import { Panel, PanelGroup } from "react-resizable-panels";
import PanelResizeHandleComp from "../../utils/PanelResizeHandle";
import { EditorHeader } from "./EditorHeader";
import { TabsContent } from "@radix-ui/react-tabs";
import GetProject from "../../../actions/project";
import IDEeditor from "./IDEeditor";

type Props = {
  value?: any;
};

const EditorCode = (props: Props) => {
  return (
    <div className="w-full h-full">
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={20} maxSize={100}>
          <div className="relative h-full items-center">
            <EditorHeader value={props.value} />
            <IDEeditor value={props.value} />
          </div>
        </Panel>
        <PanelResizeHandleComp />
        <Panel defaultSize={50} minSize={20} maxSize={100}>
          <Output value={props.value} />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default EditorCode;
