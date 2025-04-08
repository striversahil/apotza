import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import ResizableComp from "../utils/ResizableBox/ResizableComp";
import { useContextSave } from "../../../app/editor/_hooks/useContextSave";
import { MatchComponent } from "..";

interface ComponentInterface {
  value: any;
}

const DraggableComponent = ({ value }: ComponentInterface) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: value.id,
    });

  const { currentValue, setState, component } = useContextSave(value);

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
      onMouseUp={(e) => setState(e)}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative rounded-lg touch-none outline outline-[2px] outline-transparent cursor-move hover:outline-blue-400 text-black ",
        isDragging && "cursor-grabbing outline-green-500",
        component?.id === value?.id && "outline-blue-400"
      )}
    >
      {/* Your content here */}
      <Component {...currentValue} />
    </ResizableComp>
  );
};

export default DraggableComponent;
