import React, { useEffect, useState } from "react";
import { Tabs as TabRoot, TabsContent } from "@radix-ui/react-tabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Steps from "../Steps";
import EditorCode from "../Editor";
import ProjectAction from "../../../../../actions/project";
import HeaderChange from "../Tab/HeaderChange";

type Props = {
  value?: any;
};

const StepEditorRoot = (props: Props) => {
  // const [currentStep, setCurrentStep] = useState("");
  const [codeBlock, setCodeBlock] = useState<any>(null);

  if (!props.value) {
    return;
  }

  const { data } = ProjectAction.getCodeBlock(props.value.id);

  useEffect(() => {
    if (data) {
      setCodeBlock(data.payload.stepBlocks);
    }
  }, [data]);
  // const currentStep = codeBlock.steps[0]?._id;

  return (
    <div className="w-full h-full">
      {codeBlock && (
        <TabRoot className="w-full h-full" defaultValue={codeBlock[0].id}>
          <PanelGroup direction="horizontal" className="">
            <Panel defaultSize={20} minSize={20} maxSize={50}>
              <HeaderChange value={data.payload.name} />
              <Steps value={codeBlock} />
            </Panel>
            <PanelResizeHandle className="p-[1px] cursor-row-resize hover:bg-blue-500" />
            <Panel defaultSize={80} minSize={20} maxSize={80}>
              {codeBlock.map((item: any, index: number) => (
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
