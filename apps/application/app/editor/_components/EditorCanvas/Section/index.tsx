import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import React, { useEffect } from "react";
import ResizableBox from "../ResizableBox/ResizableSection";
import { Label } from "../../../../../components/ui/label";
import Image from "next/image";
import DeleteSection from "./DeleteSection";
import AddSection from "./AddSection";
import DraggableComponent from "../Component";
import ProjectAction from "../../../../../actions/project";
import { TabsTrigger } from "@radix-ui/react-tabs";
import {
  useComponent,
  useUpdatedComponent,
} from "../../../../../contexts/component";
import ResizableSection from "../ResizableBox/ResizableSection";

type Props = {
  value?: any;
};

const Section = ({ value, ...props }: Props) => {
  const [Components, setComponents] = React.useState<any>([]);
  const [currentValue, setCurrentValue] = React.useState(value);

  const { isOver, setNodeRef } = useDroppable({
    id: value.id,
  });

  const { data } = ProjectAction.getSection(value.id as string);

  const { UpdatedComponent: component } = useUpdatedComponent() || {};

  useEffect(() => {
    if (component?.id === currentValue.id) {
      setCurrentValue(component);
    }
  }, [component]);

  useEffect(() => {
    if (data) {
      setComponents(data.payload.components);
    }
  }, [data]);

  return (
    <div className="w-full h-full">
      <ResizableSection value={value}>
        <div
          ref={setNodeRef}
          className={cn(
            "relative w-full h-full border border-white/20 hover:border-white/50 rounded-xl flex items-center justify-center pointer-events-auto",
            isOver && "hover:border-white/0"
          )}
        >
          {isOver && (
            <div className="relative w-full h-full  ">
              <div className="absolute inset-0 rounded-xl  overflow-clip border-[3px] border-blue-500">
                <div
                  style={{
                    //                 backgroundImage: `
                    //        linear-gradient(to right, rgb(215, 215, 215) 1px, transparent 1px),
                    //        linear-gradient(rgb(215, 215, 215) 1px, transparent 1px)
                    // `,
                    //                 backgroundSize: "24px 24px",
                    //                 borderBottom: "1px solid rgb(215, 215, 215)",
                    //                 borderTopColor: "rgb(215, 215, 215)",
                    //                 borderRight: "1px solid rgb(215, 215, 215)",
                    //                 borderLeftColor: "rgb(215, 215, 215)",
                    //                 borderTopStyle: "dashed",
                    //                 borderLeftStyle: "dashed",
                    height: "100%",
                    opacity: 0.5,
                    width: "100%",
                    // backgroundColor: "#bd99ff",
                    backgroundImage: `
radial-gradient(at 12% 14%, hsla(265,74%,65%,1) 0px, transparent 50%),
radial-gradient(at 32% 65%, hsla(235,74%,75%,1) 0px, transparent 50%),
radial-gradient(at 77% 18%, hsla(265,75%,65%,1) 0px, transparent 50%),
radial-gradient(at 31% 49%, hsla(235,75%,65%,1) 0px, transparent 50%),
radial-gradient(at 34% 70%, hsla(265,75%,65%,1) 0px, transparent 50%),
radial-gradient(at 85% 85%, hsla(235,75%,65%,1) 0px, transparent 50%),
radial-gradient(at 11% 90%, hsla(265,75%,65%,1) 0px, transparent 50%)`,
                  }}
                ></div>
              </div>
            </div>
          )}
          {/* <Label className="absolute top-[50px] left-[70px]">
            {props.value.id + props.value.name}
          </Label> */}
          {Components &&
            Components.map((item: any) => <DraggableComponent value={item} />)}
          <DeleteSection id={data?.payload.id} />
        </div>
      </ResizableSection>
      <AddSection />
    </div>
  );
};

export default Section;
