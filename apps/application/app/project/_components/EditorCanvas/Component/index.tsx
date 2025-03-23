import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";

interface ComponentInterface {
  name: string;
  id: string;
  payload: string; // Here my Component Payload i.e. Data will Come
  configuration: object; // This will Contain Component Configuration
  coordinates: any;
}

const DraggableComponent = ({
  id,
  coordinates,
  payload,
  configuration,
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-white rounded shadow-md touch-none px-1 w-fit text-black  outline",
        isDragging
          ? "cursor-grabbing outline-green-300"
          : "cursor-grab  outline-pink-400"
      )}
      key={id}
    >
      {/* Your content here */}
      <div>{id}</div>
    </div>
  );
};

export default DraggableComponent;
