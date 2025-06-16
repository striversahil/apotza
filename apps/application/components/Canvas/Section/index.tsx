import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import AddSection from "./AddSection";
import DraggableComponent from "../_Component";
import GetProject from "../../../actions/project";
import { TabsTrigger } from "@radix-ui/react-tabs";
import {
  useComponent,
  useLayout,
  useUpdatedComponent,
} from "../../../contexts/component";
import { sectionCommon as Default } from "@repo/common";
import _, { set } from "lodash";
import { useContextSave } from "../../../app/editor/_hooks/useContextSave";
import { useSectionDroppable } from "../hooks/sectionDroppable";
import { SimpleLoader } from "@/components/loader";

interface SectionInterface {
  id: string;
  type: string;
  component: string;
  page: string;
  layout: typeof Default.layout;
  appearance: typeof Default.appearance;
  components: any;
}

type Props = {
  value: SectionInterface;
};

const Section = ({ value }: Props) => {
  const [Components, setComponents] = React.useState<any>(null);
  const ref = useRef(null);

  const { isOver, setNodeRef } = useSectionDroppable(value.id, ref);

  const { data, isLoading } = GetProject.getSection(value.id as string);

  const { setState, currentValue, activeComponent } = useContextSave(value);

  useEffect(() => {
    if (data) {
      setComponents(data.payload.components);
    }
  }, [data]);

  return (
    <div
      className="w-full p-2 "
      key={value.id}
      ref={ref}
      // onMouseMove={onMouseHover}
      style={{
        minHeight: "300px",
        height: "500px", // Later gonna be dynamic
        // borderColor: currentValue.configuration.appearance.borderColor,
        visibility: currentValue.configuration.layout.visible
          ? "visible"
          : "hidden",
      }}
      onClick={(e) => setState(e)}
    >
      <div
        ref={setNodeRef}
        className={cn(
          "relative w-full h-full border-[2px] border-transparent rounded-xl flex items-center justify-center overflow-clip pointer-events-auto",
          value.id === activeComponent?.id
            ? "border-blue-400 "
            : "border-white/20 hover:border-white/30"
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
radial-gradient(at 11% 90%, hsla(265,75%,65%,1) 0px, transparent 50%)
`,
                }}
              ></div>
            </div>
          </div>
        )}
        {!Components && <SimpleLoader />}
        {/* <Label className="absolute top-[50px] left-[70px]">
            {props.value.id + props.value.name}
          </Label> */}
        {Components &&
          Components.map((item: any) => (
            <RenderComponent key={item.id} id={item.id} />
          ))}
      </div>
    </div>
  );
};

function RenderComponent({ id }: { id: string }) {
  const { data } = GetProject.getComponent(id);

  if (data) {
    return <DraggableComponent value={data.payload} />;
  }
  return <div></div>;
}

export default Section;
