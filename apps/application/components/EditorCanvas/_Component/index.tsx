import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";

import ResizableComp from "../utils/ResizableBox/ResizableComp";
import { useContextSave } from "../../../app/editor/_hooks/useContextSave";
import { MatchComponent } from "..";
import { useLayout } from "../../../contexts/component";

interface ComponentInterface {
  value: any;
}

const DraggableComponent = ({ value }: ComponentInterface) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: value.id,
    });

  const { currentValue, setState, activeComponent } = useContextSave(value);

  const { Layout } = useLayout() || {};

  const snap = Array.from({ length: 50 }).map((_, index) =>
    Layout ? index * Layout : 0
  );

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
          "rounded-lg p-1 outline outline-[2px] outline-transparent  hover:outline-blue-400 ",
          isDragging && "cursor-grabbing outline-green-500",
          activeComponent?.id === value?.id && "outline-blue-400"
        )}
        // enable={isDragging ? false : false}
        snap={{ x: snap, y: snap }}
        snapGap={Layout ?? 0}
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
