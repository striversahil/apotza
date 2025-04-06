import React from "react";
import useDebouncedUpdate from "../utils/debouce";
import { cn } from "@/lib/utils";
import { LayoutGrid, MoveHorizontal, MoveVertical } from "lucide-react";
import Toolip_Base from "../../base/tooltip";

type Props = {
  location: Array<string>;
  initialvalue: string;
};

const layoutTypes: Record<string, React.ReactNode> = {
  grid: <LayoutGrid size={20} />,
  vertical: <MoveVertical size={20} />,
  horizontal: <MoveHorizontal size={20} />,
};

export const Layout = ({ location, initialvalue }: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value);
  return (
    <div className="flex gap-2 float-end bg-white/10 px-2 py-1 rounded-lg ">
      <Toolip_Base value={value} onSelect={setValue} list={layoutTypes} />
    </div>
  );
};

export default Layout;
