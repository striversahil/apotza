import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";

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

  const { currentValue, setState, activeComponent } = useContextSave(value);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: "absolute" as const,
    left: value.coordinates.x,
    top: value.coordinates.y,
  };

  const { Component = () => <></> } = MatchComponent[value.name]! || {};

  return (
    <div>
      <Resizable
        className={cn(
          "rounded-lg p-2  outline outline-[2px] outline-transparent  hover:outline-blue-400 ",
          isDragging && "cursor-grabbing outline-green-500",
          activeComponent?.id === value?.id && "outline-blue-400"
        )}
        // enable={isDragging ? false : false}
        // snap={{ x: [100], y: [100] }}
        style={style}
      >
        <div
          {...attributes}
          {...listeners}
          ref={setNodeRef}
          className="size-full touch-none relative cursor-move"
          onClick={(e) => setState(e)}
        >
          <Component {...currentValue} />
        </div>
        {/* Your content here */}
      </Resizable>
    </div>
  );
};

export default DraggableComponent;
