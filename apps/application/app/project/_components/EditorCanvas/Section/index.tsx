import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import React, { useEffect } from "react";
import ResizableBox from "../ResizableBox/ResizableBox";
import { Label } from "../../../../../components/ui/label";
import Image from "next/image";
import DeleteSection from "./DeleteSection";
import AddSection from "./AddSection";
import DraggableComponent from "../Component";
import ProjectAction from "../../../../../actions/project";

type Props = {
  value?: any;
};

const Section = (props: Props) => {
  const [Components, setComponents] = React.useState<any>([]);

  const { isOver, setNodeRef, rect, active } = useDroppable({
    id: props.value.id,
  });

  const { data } = ProjectAction.getSection(props.value.id as string);

  useEffect(() => {
    if (data) {
      console.log(data);
      setComponents(data.payload.components);
    }
  }, [data]);

  return (
    <div className="w-full h-full">
      <ResizableBox>
        <div
          ref={setNodeRef}
          className={cn(
            "relative w-full h-full border border-pink-400 flex items-center justify-center pointer-events-auto"
          )}
        >
          {isOver && (
            <div className="relative w-full h-full bg-blue-500">
              <div className="absolute inset-2 rounded-lg bg-white/20 overflow-clip">
                <Image
                  src="/slug.webp"
                  width={rect?.current?.width}
                  height={rect?.current?.height}
                  className="w-full h-full opacity-70 "
                  alt="slug"
                />
              </div>
            </div>
          )}
          {/* <Label className="absolute top-[50px] left-[70px]">
            {props.value.id + props.value.name}
          </Label> */}
          {Components &&
            Components.map((item: any) => <DraggableComponent {...item} />)}
          <DeleteSection id={data?.payload.id} />
        </div>
      </ResizableBox>
      <AddSection />
    </div>
  );
};

export default Section;
