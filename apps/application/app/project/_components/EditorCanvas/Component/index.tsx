import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { MatchComponent } from "@/packages/components/match_component";
import ResizableBox from "../ResizableBox/ResizableBox";

interface ComponentInterface {
  value: any;
}

const DraggableComponent = ({ value }: ComponentInterface) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: value.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: "absolute" as const,
    left: value.coordinates.x,
    top: value.coordinates.y,
  };
  const { Component } = MatchComponent?.[value.name]!;

  return (
    <ResizableBox
      value={value}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative bg-white rounded shadow-md touch-none px-1 w-fit text-black  outline",
        isDragging
          ? "cursor-grabbing outline-green-300"
          : "cursor-grab  outline-pink-400"
      )}
      key={value.id}
    >
      {/* Your content here */}
      <Component {...value} />
    </ResizableBox>
  );
};

export default DraggableComponent;
