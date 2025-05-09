import React from "react";
import { PanelResizeHandle } from "react-resizable-panels";

type Props = {};

const PanelResizeHandleComp = (props: Props) => {
  const [drag, setDrag] = React.useState(false);
  return (
    <div
      className={`py-[2px]  ${drag ? "bg-blue-500" : "hover:bg-blue-500"}`}
      onFocus={() => setDrag(true)}
    >
      <PanelResizeHandle />
    </div>
  );
};

export default PanelResizeHandleComp;
