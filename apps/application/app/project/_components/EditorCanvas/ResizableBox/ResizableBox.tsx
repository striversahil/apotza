import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import { toast } from "sonner";
import { useComponent } from "../../../../../contexts/component";

interface Props {
  value: any;
}

const ResizableBox = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & Props
>(({ className, children, style = {}, value, ...props }, ref) => {
  const [width, setWidth] = useState(value.layout.width || 200);
  const [height, setHeight] = useState(value.layout.height || 200);
  const DOMref = useRef<HTMLDivElement>(null);
  const initialX = useRef(0);
  const initialY = useRef(0);
  const isResizing = useRef(false);
  const initialWidth = useRef<number>(0);
  const initialHeight = useRef<number>(0);

  const { setComponent } = useComponent() || {};

  const handleMouseX = useRef((e: MouseEvent) => {
    //UseRef because it won't will cause rerender's and i was not having any dependency
    //useRef returns a mutable ref object
    if (!isResizing.current) return; // If not resizing, do nothing
    const newWidth =
      initialWidth.current +
      Math.floor((e.clientX - initialX.current) / 10) * 10; // Set Width in Snap Size of 10px
    setWidth(newWidth);
  });

  // Debounced mouse move handler
  const handleMouseY = useRef((e: MouseEvent) => {
    if (!isResizing.current) return;

    const newHeight =
      initialHeight.current +
      Math.floor((e.clientY - initialY.current) / 10) * 10;

    setHeight(newHeight);
  });

  const handleMouseDownCommon = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseDownX(e);
    handleMouseDownY(e);
  };
  const handleMouseDownX = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    initialX.current = e.clientX;
    initialWidth.current = DOMref.current?.offsetWidth || 200;

    document.addEventListener("mousemove", handleMouseX.current);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownY = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    initialY.current = e.clientY;
    initialHeight.current = DOMref.current?.offsetHeight || 200;

    document.addEventListener("mousemove", handleMouseY.current);
    document.addEventListener("mouseup", handleMouseUp);
  };

  //  Cleanup all Event listeners
  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseX.current);
    document.removeEventListener("mousemove", handleMouseY.current);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Cleanup Callback listener
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseX.current);
      document.removeEventListener("mousemove", handleMouseY.current);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div
      className="relative p-1 w-fit"
      ref={DOMref}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        setComponent(value);
        toast(`${((width * height) / 100).toFixed()}`);
      }}
    >
      <div
        ref={ref}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          overflow: "hidden",
        }}
        {...props}
        className={className}
      >
        {children}
        {/* Resizable Handle */}
      </div>
      <div
        onMouseDown={handleMouseDownX}
        className="absolute right-0 top-0 h-full rounded-full w-1 hover:bg-blue-500 cursor-e-resize"
      ></div>
      <div
        onMouseDown={handleMouseDownY}
        className="absolute bottom-0 w-full rounded-full h-1 hover:bg-blue-500 cursor-n-resize "
      />
      <div
        className="absolute bottom-0 right-0 h-4 w-4 rounded-full cursor-nw-resize"
        onMouseDown={handleMouseDownCommon}
      />
      {/* Resizable Handle */}
    </div>
  );
});

export default ResizableBox;
