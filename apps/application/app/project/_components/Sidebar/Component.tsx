"use client";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../../../components/ui/Tooltip/tooltip";
import { Input } from "../../../../components/ui/input";
import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { ReferenceSidebarComponents } from "../../../../common/referenceSidebarComponents";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Component as ComponentIcon } from "lucide-react";
import { MatchComponent } from "@/packages/components/match_component";
import PopOver from "./PopOver";

type SidebarProps = {
  children?: React.ReactNode;
};

const CompSidebar = ({ children }: SidebarProps) => {
  // Draggable Component

  const [open, setOpen] = React.useState(false);
  const Draggable = ({ id, title, target, client }: any) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: id,
        data: {
          type: "item",
        },
      });

    const Component = MatchComponent[target];

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
        <div>{isDragging ? Component : title}</div>
      </div>
    );
  };

  // const handleCompEvent = (event: any, item: any) => {
  //   const client = {
  //     x: event.clientX,
  //     y: event.clientY,
  //   };
  //   // setOpen(false);
  //   setComponent({ ...item, client });
  // };

  // console.log("Rendered CompSidebar");
  return (
    <div>
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
        <PopOver setOpened={setOpen}>
          <div className="bg-gray-800 w-full h-full rounded-md">
            <div className="flex items-center justify-center">
              <Input
                className=" text-white bg-white/20 p-2 rounded-lg w-full "
                placeholder="Search ..."
              ></Input>
            </div>
            <div className=" py-[10%]">
              <div className="relative grid grid-cols-2 gap-5 mx-2">
                {ReferenceSidebarComponents.map(
                  (item: Record<string, any>, index: number) => (
                    <Draggable key={index} {...item} />
                  )
                )}
              </div>
            </div>
          </div>
        </PopOver>
      )}
      {/* {Component && <Draggable {...Component} />} */}
    </div>
  );
};

export default CompSidebar;
