import React from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@repo/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  list: Array<string>;
  value: string;
  onChange: (value: string) => void;
};

const Select_Base = ({ list, value, onChange }: Props) => {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className="w-fit bg-slate-950 focus:bg-white/10 gap-1 border-none p-0">
        <div>{value}</div>
      </SelectTrigger>
      <SelectContent className="bg-slate-950 cursor-pointer px-1 py-2">
        {list.map((item: string) => (
          <SelectItem
            value={item}
            className={cn(
              " focus:bg-white/10 text-center",
              item == value && "bg-white/10"
            )}
          >
            <span className="text-center w-full">{item}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Select_Base;
