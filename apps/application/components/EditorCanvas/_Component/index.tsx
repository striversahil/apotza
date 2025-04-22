import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";

import ResizableComp from "../../../../../archive/ResizableBox/ResizableComp";
import { useContextSave } from "../../../app/editor/_hooks/useContextSave";
import { MatchComponent } from "..";
import { useLayout } from "../../../contexts/component";
import ComponentAction from "@/actions/project/component";

interface ComponentInterface {
  value: any;
}

const DraggableComponent = ({ value }: ComponentInterface) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: value.id,
    });

  const { mutate } = ComponentAction.update(value.section);

  const { ref, focused, currentValue, setState, activeComponent } =
    useContextSave(value);

  const { Layout } = useLayout() || {};

  // Snap to grid
  const snap = Array.from({ length: 100 }).map((_, index) =>
    Layout ? index * Layout : 0
  );

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const { Component = () => <></> } = MatchComponent[value.name]! || {};

  return (
    <div
      onClick={(e) => setState(e)}
      ref={ref}
      style={{
        position: "absolute" as const,
        left: Layout ? value.coordinates.x * Layout : 0,
        top: value.coordinates.y * 10,
        transform: "translate(-50%, -50%)",
      }}
    >
      {Layout && value && (
        <Resizable
          // className={cn(
          //   "relative rounded-lg outline outline-[2px] outline-transparent   ",
          //   isDragging && "cursor-grabbing outline-green-500",
          //   activeComponent?.id === value?.id && "outline-blue-400"
          // )}
          // enable={isDragging ? false : false}
          onResize={(_, direction, ref, d) => {
            // console.log(d);
            // Todo : Make Translate multiDirectional
          }}
          size={{
            width: value.layout.width * Layout,
            height: value.layout.height,
          }}
          onResizeStop={(_, direction, ref, d) => {
            mutate({
              id: value.id,
              layout: {
                ...value.layout,
                width: value.layout.width + Math.round(d.width / Layout),
                height: value.layout.height + d.height,
              },
            });
          }}
          defaultSize={{
            width: value.layout.width * Layout,
            height: value.layout.height,
          }}
          snap={{ x: snap, y: snap }}
          snapGap={Layout}
          style={style}
          minWidth={Layout * 10}
          minHeight={50}
        >
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={cn(
              " size-full cursor-move outline outline-[2px] outline-transparent  rounded-lg ",
              isDragging && "cursor-grabbing outline-green-500",
              activeComponent?.id === value?.id && "outline-blue-400"
            )}
          >
            <Component {...currentValue} />
          </div>
          {/* Your content here */}
        </Resizable>
      )}
    </div>
  );
};

export default DraggableComponent;
