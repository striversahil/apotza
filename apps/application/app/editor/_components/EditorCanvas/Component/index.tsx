import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { MatchComponent } from "@repo/components";
import {
  useComponent,
  usePrevComponent,
  useUpdatedComponent,
} from "../../../../../contexts/component";
import ResizableComp from "../ResizableBox/ResizableComp";
import _ from "lodash";
import { useContextSave } from "../../../_hooks/useContextSave";

interface ComponentInterface {
  value: any;
}

const DraggableComponent = ({ value }: ComponentInterface) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: value.id,
    });

  const { currentValue , setState} = useContextSave(value);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: "absolute" as const,
    left: value.coordinates.x,
    top: value.coordinates.y,
  };

  // const { currentTab, currentStep }: any = useUtility();
  const { Component = () => <></> } = MatchComponent[value.name]! || {};

  return (
    <ResizableComp
      value={value}
      ref={setNodeRef}
      onMouseUp={(e) => {
        setState(e)
      }}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative rounded-lg touch-none focus:outline outline-[2px] hover:outline  text-black ",
        isDragging
          ? "cursor-grabbing outline-green-500"
          : "cursor-grab  outline-blue-400"
      )}
    >
      {/* Your content here */}
      <Component {...currentValue} />
    </ResizableComp>
  );
};

export default DraggableComponent;
