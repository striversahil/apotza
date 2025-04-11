import React, { useCallback, useEffect, useState } from "react";
import { ImperativePanelGroupHandle } from "react-resizable-panels";
import { useLayout } from "../../../contexts/component";

export const useWidthDrag = (
  ref: React.RefObject<ImperativePanelGroupHandle>
) => {
  const [slug, setslug] = useState<number[]>([]);
  const { Layout, setLayout = () => {} } = useLayout() || {};

  useEffect(() => {
    const layout = ref.current;
    if (layout && layout.getLayout) {
      // console.log(layout);
      const number = layout.getLayout();
      setslug(number);
    }
    const timer = setTimeout(() => {
      console.log(slug);
    }, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  return {};
};
