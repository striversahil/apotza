import { debounce } from "lodash";
import { useEffect } from "react";
import { useLayout } from "../../../contexts/component";

export const useResizePage = (
  ref: React.MutableRefObject<null>,
  loading: Boolean
) => {
  const { setLayout = () => {} } = useLayout() || {};

  // Resize DOM Transformer
  const handleResizeEnd = debounce((entry) => {
    const { width, height } = entry.contentRect;

    const transformedWidth = Math.round(width / 20);
    setLayout(transformedWidth);
  }, 300);

  useEffect(() => {
    if (!ref.current) return;

    //  Initializing Resize Observer with selected entry as treating just one Element now .
    const resizeObserver = new ResizeObserver(([entry]) => {
      handleResizeEnd(entry);
    });

    resizeObserver.observe(ref.current);

    // Cleaning up
    return () => resizeObserver.disconnect();
  }, [loading]);

  return {};
};
