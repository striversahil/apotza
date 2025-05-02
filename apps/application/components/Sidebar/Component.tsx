"use client";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@repo/ui/Tooltip/tooltip";
import { Input } from "@repo/ui/input";
import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { ReferenceSidebarComponents } from "../../common/referenceSidebarComponents";
import { cn } from "@/lib/utils";
import { Component as ComponentIcon } from "lucide-react";

import PopOver from "./PopOver";
import { MatchComponent } from "../Canvas";

type SidebarProps = {
  children?: React.ReactNode;
};

const CompSidebar = ({ children }: SidebarProps) => {
  // Draggable Component

  const [open, setOpen] = React.useState(false);
  const [Dragging, setDragging] = React.useState(false);
  const Draggable = ({ id, title, target, client }: any) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: target,
        data: {
          type: "item",
        },
      });

    const { Component } = MatchComponent[target]!;
    // if (isDragging) setDragging(true);
    // if (!isDragging) setDragging(false);

    return (
      <div
        ref={setNodeRef}
        style={{
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        }}
        {...attributes}
        {...listeners}
        className={cn(
          "relative ",
          isDragging
            ? "cursor-grabbing"
            : "cursor-grab p-2 rounded-lg  text-center bg-white/20"
        )}
        onMouseUp={() => setOpen(false)}
      >
        <div className="absolute inset-0"></div>
        <div>{isDragging ? <Component /> : title}</div>
      </div>
    );
  };

  return (
    <div className="">
      <Tooltip>
        <TooltipTrigger>
          <div
            className="w-fit justify-center cursor-pointer hover:bg-white/10 p-2 duration-200 rounded-md"
            onClick={() => setOpen(!open)}
          >
            <ComponentIcon />
          </div>
        </TooltipTrigger>
        <TooltipContent>Components</TooltipContent>
      </Tooltip>

      {open && (
        <PopOver setOpened={setOpen} isDragging={Dragging}>
          {ReferenceSidebarComponents.map(
            (item: Record<string, any>, index: number) => (
              <Draggable key={index} {...item} />
            )
          )}
        </PopOver>
      )}
    </div>
  );
};

export default CompSidebar;
