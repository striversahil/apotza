import React from "react";
import useDebouncedUpdate from "../utils/debouce";
import { cn } from "@/lib/utils";
import { LayoutGrid, MoveHorizontal, MoveVertical } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../../../components/ui/Tooltip/tooltip";

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
      {Object.keys(layoutTypes).map((item) => (
        <Tooltip key={item}>
          <TooltipTrigger
            className={cn(
              `px-2 py-1 rounded-md flex
            cursor-pointer capitalize text-sm font-bold text-white`,
              {
                "bg-slate-900/80": item === value,
              }
            )}
            onClick={() => setValue(item)}
          >
            <>{layoutTypes[item]}</>
            <TooltipContent className="bg-slate-950 rounded-lg">
              {item}
            </TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      ))}
    </div>
  );
};

export default Layout;
