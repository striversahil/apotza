"use client";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import ProjectAction from "../../../../actions/project";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Section from "./Section";
import { TabsList } from "@radix-ui/react-tabs";
import {
  useComponent,
  useUpdatedComponent,
} from "../../../../contexts/component";
import { usePathname } from "next/navigation";
import { Loader } from "lucide-react";

const EditorCanvas = () => {
  const router = usePathname();
  const [Sections, setSections] = useState<any>(null);
  const { isLoading, data } = ProjectAction.getPage(router || "");

  // const currentRoute =

  useEffect(() => {
    if (data) {
      setSections(data.payload.sections);
    }
  }, [data]);

  // This whole Component is a drag and drop zone
  return (
    <div className="relative w-full p-[1px] pb-[200px] flex flex-col gap-2 overflow-hidden">
      Current Path: {router} {router.split("/").pop()}
      {/* <div
        className={`w-full min-h-screen h-full` + (isOver ? " bg-white/5" : "")}
        ref={setNodeRef}
      >
        <div className="relative w-full h-full">
          {components.map((item: any, index: number) => (
            <Draggable key={index} {...item}></Draggable>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default EditorCanvas;
