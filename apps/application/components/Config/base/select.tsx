import React from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@repo/ui/select";

type Props = {
  list: Array<string>;
  value: string;
  onChange: (value: string) => void;
};

const Select_Base = ({ list, value, onChange }: Props) => {
  return (
    <div>
      <Select defaultValue={value} onValueChange={onChange}>
        <SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
          <div>{value}</div>
        </SelectTrigger>
        <SelectContent>
          {list.map((item: string) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Select_Base;
