"use client";
import ProjectAction from "../../../actions/project";
import ComponentAction from "../../../actions/project/component";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ReferenceSidebarComponents } from "../../../common/referenceSidebarComponents";
import React, { useEffect } from "react";
import { MatchComponent } from "";

export const useDragEnd = () => {
  const [Data, setData] = React.useState<Record<string, any>[]>([]);

  const [activeId, setActiveId] = React.useState<string>("");
  const [IsDropped, setIsDropped] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const { data } = ProjectAction.getComponents();
  const { mutate: mutateAdd } = ComponentAction.add(activeId);
  const { mutate: mutateUpdate } = ComponentAction.coordinatesUpdate(activeId);

  // useEffect(() => {
  //   if (activeId) {
  //     refetch();
  //   }
  // }, [activeId, refetch]);

  useEffect(() => {
    if (data) {
      setData(data.payload);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event: any) => {
    if (event.over?.id) {
      setActiveId(event.over.id);
      console.log(event.over.id);

      // Get the current mouse position , Currently not finding any way to get it
      const mouseX = event.activatorEvent.clientX;
      const mouseY = event.activatorEvent.clientY;

      const dropArea = document.getElementById(event.over.id); // Get the drop area element
      const dropRect = dropArea?.getBoundingClientRect(); // Get its position

      // Check if the active item is already in the array
      // if (!Data || event.active.id) return null;
      const PresentElement = Data.find((item: any) => item === event.active.id);

      console.log(PresentElement);

      // If the active item is not in the array, add it
      if (!PresentElement) {
        const { Default } = MatchComponent[event.active.id]!;
        mutateAdd({
          name: event.active.id,
          section: event.over.id,
          coordinates: {
            x: 245, // mouseX,
            y: 145, // mouseY,
          },
          ...Default,
        });
        // Else We are modifying it from the Array
      } else {
        mutateUpdate({
          id: PresentElement,
          x: event.delta.x,
          y: event.delta.y,
        });
      }
      setIsDropped(true);
    }
    // setIsDragging(false);
  };
  return {
    Data,
    setData,
    activeId,
    IsDropped,
    setIsDropped,
    setIsDragging,
    handleDragEnd,
    sensors,
  };
};
