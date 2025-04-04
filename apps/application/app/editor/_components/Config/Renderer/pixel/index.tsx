import React from "react";
import { Input } from "@repo/ui/input";
import useDebouncedUpdate from "../utils/debouce";
import { Select, SelectContent, SelectTrigger } from "@repo/ui/select";
import { SelectItem } from "@radix-ui/react-select";

type Props = {
  location: Array<string>;
  initialvalue: number;
};

export const Pixel = ({ location, initialvalue }: Props) => {
  const [value, setValue] = React.useState<number>(initialvalue);

  useDebouncedUpdate(location, value);

  return (
    <div className="flex float-end gap-2">
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <Select defaultValue={"pixel"}>
        <SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
          <div>{value}</div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.25">0.5rem</SelectItem>
          <SelectItem value="0.5">0.75rem</SelectItem>
          <SelectItem value="0.75">1rem</SelectItem>
          <SelectItem value="1">1.25rem</SelectItem>
          <SelectItem value="1.25">1.5rem</SelectItem>
          <SelectItem value="1.5">1.75rem</SelectItem>
          <SelectItem value="1.75">2rem</SelectItem>
          <SelectItem value="2">2.5rem</SelectItem>
          <SelectItem value="2.5">3rem</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Pixel;
