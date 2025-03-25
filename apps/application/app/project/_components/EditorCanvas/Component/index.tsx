import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { MatchComponent } from "@/packages/components/match_component";
import ResizableBox from "../ResizableBox/ResizableBox";

interface ComponentInterface {
  name: string;
  id: string;
  layout: any;
  coordinates: any;
}

const DraggableComponent = ({
  id,
  name,
  layout,
  coordinates,
  ...props
}: ComponentInterface) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: "absolute" as const,
    left: coordinates.x,
    top: coordinates.y,
  };
  const { Component } = MatchComponent?.[name]!;

  return (
    <ResizableBox
      layout={layout}
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
      key={id}
    >
      {/* Your content here */}
      <Component {...props} />
    </ResizableBox>
  );
};

export default DraggableComponent;
