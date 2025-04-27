"use client";
import React, { useEffect, useState } from "react";

import Tabs from "./Tab";
import EditorCode from "./Editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useOpen } from "../../app/editor/_hooks/useOpenCode";
import PanelResizeHandleComp from "../utils/PanelResizeHandle";
import { useQueryData } from "@/hooks/useQueryData";
import { TabsContent } from "@radix-ui/react-tabs";
import GetProject from "../../actions/project";
import StepEditorRoot from "./Steps";
import { useCurrentTab } from "../../app/editor/_hooks/useCurrentTab";
import Loader from "./loader";

const CodeBlock = () => {
  const { openCode, handleOpenCode } = useOpen();
  const [CodeBlockData, setCodeBlockData] = useState<[] | null>(null);

  const { currentTab } = useCurrentTab() || {};

  const activeTab: any = CodeBlockData?.find(
    (item: any) => item.id === currentTab
  );

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
          defaultSize={40}
          minSize={20}
          maxSize={100}
          collapsible
          onCollapse={handleOpenCode}
        >
          <div className="ml-1 h-full bg-slate-800 overflow-y-auto">
            {!activeTab && <Loader />}
            {activeTab && (
              <div key={activeTab.id} className="w-full h-full">
                <StepEditorRoot value={activeTab} />
              </div>
            )}
          </div>
        </Panel>
      )}
    </>
  );
};

export default CodeBlock;
