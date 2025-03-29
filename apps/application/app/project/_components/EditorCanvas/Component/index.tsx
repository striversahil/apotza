import React, { use, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { MatchComponent } from "@/packages/components/match_component";
import ResizableBox from "../ResizableBox/ResizableBox";
import { useUtility } from "../../../../../contexts/utils";
import { useComponent } from "../../../../../contexts/component";

interface ComponentInterface {
  value: any;
}

const DraggableComponent = ({ value }: ComponentInterface) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: value.id,
    });

  const [currentValue, setCurrentValue] = React.useState(value);

  const { UpdatedComponent: component } = useComponent() || {};
  // Setting the Component State from the Context

  useEffect(() => {
    if (component?.id === value.id) {
      setCurrentValue(component);
    } else {
      setCurrentValue(value);
    }
  }, [component, value]);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: "absolute" as const,
    left: value.coordinates.x,
    top: value.coordinates.y,
  };

  // const { currentTab, currentStep }: any = useUtility();
  // console.log(currentTab);
  const { Component } = MatchComponent?.[value.name]!;

  return (
    <ResizableBox
      value={value}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative rounded-lg touch-none focus:outline outline-[2px] hover:outline  text-black ",
        isDragging
          ? "cursor-grabbing outline-green-500"
          : "cursor-grab  outline-blue-400"
      )}
      key={value.id}
    >
      {/* Your content here */}
      <Component {...currentValue} />
    </ResizableBox>
  );
};

export default DraggableComponent;
