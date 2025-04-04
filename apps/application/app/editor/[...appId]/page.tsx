"use client";
import EditorCanvas from "../_components/EditorCanvas";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { PanelRightOpen } from "lucide-react";

import Sidebar from "../_components/Sidebar";
import CodeBlock from "../_components/CodeBlock";
import ConfigFolder from "../_components/Config";
import { DndContext } from "@dnd-kit/core";
import Header from "../_components/Header";
import { useOpen } from "../_hooks/useOpenCode";
import { Tabs as TabsRoot } from "@repo/ui/tabs";
import { TooltipProvider } from "@repo/ui/Tooltip/tooltip";
import { useCurrentTab } from "../_hooks/useCurrentTab";
import { useDragEnd } from "../_hooks/usedragEnd";

type Props = {};

const page = (props: Props) => {
  const {
    handleDragEnd,
    //   setActiveId,
    //   activeId,
    //   setIsDropped,
    //   setIsDragging,
    sensors,
  } = useDragEnd();

  const { openConfig, handleOpenConfig } = useOpen();

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      // onDragStart={(event) => {
      //   setActiveId(event.active.id as string);
      //   setIsDropped(false);
      //   setIsDragging(true);
      // }}
      sensors={sensors}
    >
      <TooltipProvider>
        <main className="relative h-screen bg-slate-950 min-w-screen">
          <Sidebar />
          {/* Main Resizable Pannel Start's Here */}
          <Header />
          <PanelGroup
            direction="horizontal"
            style={{
              position: "relative",
              height: "calc(100% - 5vh)",
              width: "calc(100% - 55px)",
              left: "55px",
              top: "5vh",
            }}
          >
            <Panel defaultSize={80}>
              <TabsRoot defaultValue={"0"} className="h-full">
                <PanelGroup direction="vertical" className="">
                  <Panel defaultSize={60} className="relative">
                    <div className="absolute inset-0  overflow-y-scroll">
                      <EditorCanvas />
                    </div>
                  </Panel>

                  <CodeBlock />
                </PanelGroup>
              </TabsRoot>
            </Panel>
            {openConfig && (
              <PanelResizeHandle className="p-[2px] cursor-row-resize hover:bg-blue-500" />
            )}
            {openConfig && (
              <Panel
                defaultSize={20}
                minSize={10}
                collapsible
                onCollapse={handleOpenConfig}
                maxSize={40}
                className="relative"
              >
                <div className="absolute inset-0 overflow-y-auto bg-slate-900">
                  <ConfigFolder
                  // selectedItem={activeId}
                  />
                </div>
              </Panel>
            )}
          </PanelGroup>
          {!openConfig && (
            <div
              className="fixed top-[5vh] right-0 p-2 bg-black/50 rounded-md cursor-pointer hover:bg-white/10"
              onClick={() => handleOpenConfig()}
            >
              <PanelRightOpen />
            </div>
          )}
        </main>
      </TooltipProvider>
    </DndContext>
  );
};

export default page;

{
  /* Drag Overlay will act as Our Drag Preview */
}
{
  /* {isDragging ? (
  <div className="fixed w-screen h-screen bg-black">Dragging</div>
) : null} */
}
