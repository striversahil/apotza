import { useDroppable } from "@dnd-kit/core";
import { debounce } from "lodash";
import React, { useEffect } from "react";

export const useSectionDroppable = (
  id: string,
  ref: React.MutableRefObject<null | HTMLDivElement>
) => {
  // Initializing Droppable Zone
  const { isOver, setNodeRef } = useDroppable({
    id: id as string,
  });

  return {
    isOver,
    setNodeRef,
  };
};
