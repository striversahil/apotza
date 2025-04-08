import React from "react";
import useDebouncedUpdate from "../utils/debouce";
import { cn } from "@/lib/utils";
import {
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  LayoutGrid,
  MoveHorizontal,
  MoveVertical,
} from "lucide-react";
import Tab_Base from "../../base/tab";

type Props = {
  location: Array<string>;
  initialvalue: string;
  layout?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
};

export const Tab = ({
  location,
  initialvalue,
  layout,
  horizontal,
  vertical,
}: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value);

  return (
    <div className="float-end ">
      {layout && (
        <Tab_Base value={value} onSelect={setValue} list={layoutTypes} />
      )}
      {horizontal && (
        <Tab_Base value={value} onSelect={setValue} list={horizontalAlign} />
      )}
      {vertical && (
        <Tab_Base value={value} onSelect={setValue} list={verticalAlign} />
      )}
    </div>
  );
};

export default Tab;

const layoutTypes: Record<string, React.ReactNode> = {
  grid: <LayoutGrid size={20} />,
  vertical: <MoveVertical size={20} />,
  horizontal: <MoveHorizontal size={20} />,
};

const verticalAlign: Record<string, React.ReactNode> = {
  top: <AlignVerticalJustifyStart size={20} />,
  center: <AlignVerticalJustifyCenter size={20} />,
  bottom: <AlignVerticalJustifyEnd size={20} />,
};
const horizontalAlign: Record<string, React.ReactNode> = {
  left: <AlignLeft size={20} />,
  center: <AlignJustify size={20} />,
  right: <AlignRight size={20} />,
};
