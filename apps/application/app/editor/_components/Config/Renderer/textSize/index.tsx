import React, { useCallback } from "react";
import { Input } from "../../../../../../../../packages/ui/src/input";
import _ from "lodash";
import useDebouncedUpdate from "../utils/debouce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../../../../../../packages/ui/src/select";

type Props = {
  location: Array<string>;
  initialvalue: string;
};

// I will get Full Config of the Component Here

export const TextSize: React.FC<Props> = ({
  location,
  initialvalue,
}: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <Input
        defaultValue={initialvalue}
        value={value}
        onChange={handleChange}
        type="number"
        className=""
      />
      <Select defaultValue={initialvalue} onValueChange={setValue}>
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
