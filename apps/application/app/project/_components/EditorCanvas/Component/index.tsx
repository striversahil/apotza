import React, { use, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { MatchComponent } from "@/packages/components/match_component";
import ResizableBox from "../ResizableBox/ResizableSection";
import { useUtility } from "../../../../../contexts/utils";
import {
  useComponent,
  useUpdatedComponent,
} from "../../../../../contexts/component";
import ResizableComp from "../ResizableBox/ResizableComp";

interface ComponentInterface {
  value: any;
}

const DraggableComponent = ({ value }: ComponentInterface) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: value.id,
    });

  const [currentValue, setCurrentValue] = React.useState(value);

  const { setComponent = () => {} } = useComponent() || {};

  const { UpdatedComponent: component, setUpdatedComponent = () => {} } =
    useUpdatedComponent() || {};
  // Setting the Component State from the Context

  useEffect(() => {
    if (component?.id === value.id) {
      setCurrentValue(component);
    } else if (component?.id !== value.id) {
      setCurrentValue(value);
    }
  }, [component]);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: "absolute" as const,
    left: value.coordinates.x,
    top: value.coordinates.y,
  };

  // const { currentTab, currentStep }: any = useUtility();
  const { Component } = MatchComponent?.[value.name]!;

  return (
    <ResizableComp
      value={value}
      ref={setNodeRef}
      onClick={(e) => {
        e.stopPropagation();
        if (JSON.stringify(component) !== JSON.stringify(value)) {
          console.log("Component Clicked");
          setComponent(value);
          setUpdatedComponent(value);
        }
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
      key={value.id}
    >
      {/* Your content here */}
      <Component {...currentValue} />
    </ResizableComp>
  );
};

export default DraggableComponent;
