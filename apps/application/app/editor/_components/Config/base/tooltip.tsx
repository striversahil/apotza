import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/Tooltip/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  list: Record<string, React.ReactNode>;
  onSelect: (value: string) => void;
};

const Toolip_Base = ({ list, onSelect, value }: Props) => {
  return (
    <div>
      {Object.keys(list).map((item) => (
        <Tooltip key={item}>
          <TooltipTrigger
            className={cn(
              `px-2 py-1 rounded-md flex
          cursor-pointer capitalize text-sm font-bold text-white`,
              {
                "bg-slate-900/80": item === value,
              }
            )}
            onClick={() => onSelect(item)}
          >
            <>{list[item]}</>
            <TooltipContent className="bg-slate-950 rounded-lg">
              {item}
            </TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      ))}
    </div>
  );
};

export default Toolip_Base;
