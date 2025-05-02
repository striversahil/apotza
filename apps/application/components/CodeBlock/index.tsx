"use client";
import React, { useEffect, useState } from "react";

import Tabs from "./Tab";
import EditorCode from "./Editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useOpen } from "../../app/editor/_hooks/useOpenCode";
import PanelResizeHandleComp from "../utils/PanelResizeHandle";
import GetProject from "../../actions/project";
import StepEditorRoot from "./Steps";
import { SimpleLoader } from "@/components/loader";
import { CurrentStepProvider, useCurrentTab } from "../../contexts/codeblock";

const CodeBlock = () => {
  const { openCode, handleOpenCode } = useOpen();
  const [CodeBlockData, setCodeBlockData] = useState<[] | null>(null);

  const { currentTab } = useCurrentTab() || {};

  const { isLoading, data } = GetProject.getProject();

  useEffect(() => {
    if (data) {
      setCodeBlockData(data.payload.codeblocks);
    }
  }, [data, currentTab]);

  return (
    <>
      <Tabs
        handleOpen={handleOpenCode}
        Open={openCode}

        // BlockData={(item) => setBlockData(item)}
      />
      {openCode && <PanelResizeHandleComp />}
      {openCode && (
        <Panel
          defaultSize={43}
          minSize={20}
          maxSize={100}
          collapsible
          onCollapse={handleOpenCode}
        >
          <div className="ml-1 h-full bg-slate-800 overflow-y-auto">
            {!CodeBlockData && <SimpleLoader size={25} />}
            {CodeBlockData?.map((item: any) => (
              <CurrentStepProvider currentTab={item.id} key={item.id}>
                {item.id === currentTab && <StepEditorRoot value={item} />}
              </CurrentStepProvider>
            ))}
          </div>
        </Panel>
      )}
    </>
  );
};

export default CodeBlock;
