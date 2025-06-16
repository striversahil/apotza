"use client";
import GetProject from "../../../actions/project";
import ComponentAction from "../../../actions/project/component";
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect } from "react";
import { useLayout } from "../../../contexts/component";

export const useDragEnd = () => {
  const [Data, setData] = React.useState<any>(null);

  const [activeId, setActiveId] = React.useState<string>("");
  const [IsDropped, setIsDropped] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [Width, setWidth] = React.useState(0);

  const { data } = GetProject.getComponents();
  const { mutate: mutateAdd } = ComponentAction.add(activeId);
  const { mutate: mutateUpdate } = ComponentAction.coordinateUpdate(activeId);

  // useEffect(() => {
  //   if (activeId) {
  //     refetch();
  //   }
  // }, [activeId, refetch]);

  const { Layout } = useLayout() || {};

  useEffect(() => {
    if (!window) return;
    const width = localStorage.getItem("width");
    if (width) {
      setWidth(Number(width));
    }
  }, [Layout]);

  useEffect(() => {
    if (data) {
      setData(data.payload);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const onMouseHover = (event: React.MouseEvent<HTMLDivElement>) => {
    return { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id) {
      setActiveId(event.active.id as string);

      // Get the current mouse position , Currently not finding any way to get it
      // const mouseX = event.activatorEvent.clientX;
      // const mouseY = event;

      const dropArea = document.getElementById(event.over.id as string); // Get the drop area element
      const dropRect = dropArea?.getBoundingClientRect(); // Get its position

      // Check if the active item is already in the array
      // if (!Data || event.active.id) return null;
      const PresentElement = Data.find((item: any) => item === event.active.id);

      // console.log(PresentElement);

      // If the active item is not in the array, add it
      if (!PresentElement) {
        mutateAdd({
          name: event.active.id,
          // Add page : id of the page if you wan't to add Dialog like Component's as it's will be part of Page
          section: event.over.id,
          coordinates: {
            x: 10, // mouseX,
            y: 5, // mouseY,
          },
        });
        // Else We are modifying it from the Array
      } else {
        mutateUpdate({
          id: PresentElement,
          x: event.delta.x / Width,
          y: event.delta.y / 10,
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
    // onMouseHover,
  };
};
