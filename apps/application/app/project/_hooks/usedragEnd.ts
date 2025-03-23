import ProjectAction from "../../../actions/project";
import ComponentAction from "../../../actions/project/component";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import React, { useEffect } from "react";

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
      const mouseX = event.activatorEvent.clientX;
      const mouseY = event.activatorEvent.clientY;

      // Check if the active item is already in the array
      // if (!Data || event.active.id) return null;
      const PresentElement = Data.find(
        (item: any) => item.id === event.active.id
      );

      // If the active item is not in the array, add it
      if (!PresentElement) {
        mutateAdd({
          metadata: {
            name: "Component " + Date.now(),
            section_id: activeId,
            coordinates: {
              x: mouseX,
              y: mouseY,
            },
            configuration: {
              type: "component",
              name: "Component " + Date.now(),
            },
          },
          payload: { Json_Data: "Component " + Date.now() },
        });
        // Else We are modifying it from the Array
      } else {
        mutateUpdate({
          id: PresentElement.id,
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
