"use client";
import React, { useEffect, useState } from "react";
import Output from "../Output";
import { Panel, PanelGroup } from "react-resizable-panels";
import PanelResizeHandleComp from "../../utils/PanelResizeHandle";
import { EditorZone } from "./EditorZone";
import { TabsContent } from "@radix-ui/react-tabs";
import ProjectAction from "../../../actions/project";

type Props = {
  value?: any;
};

const EditorCode = (props: Props) => {
  return (
    <div className="w-full h-full">
      <PanelGroup direction="vertical">
        <Panel defaultSize={60} minSize={20} maxSize={100}>
          <EditorZone value={props.value} />
        </Panel>
        <PanelResizeHandleComp />
        <Panel defaultSize={40} minSize={20} maxSize={100}>
          <Output value={props.value} />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default EditorCode;
