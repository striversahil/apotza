import React from "react";
import { Input } from "@repo/ui/input";
import useDebouncedUpdate from "../utils/debouce";
import { Switch } from "@repo/ui/switch";

interface initialvalue {
  config: string;
  value: boolean;
}

type Props = {
  location: Array<string>;
  initialvalue: initialvalue;
};

export const Boolean = ({ location, initialvalue }: Props) => {
  const [value, setValue] = React.useState<initialvalue>(initialvalue);

  useDebouncedUpdate(location, value);

  return (
    <div className="flex w-full items-center">
      <div className="flex-1" />
      <Switch
        checked={value.value}
        onCheckedChange={() =>
          setValue((prev) => ({ ...prev, value: !prev.value }))
        }
        className="h-5 w-10 data-[state=checked]:bg-sky-400 data-[state=unchecked]:bg-slate-700 duration-500 ease-in-out"
      />
    </div>
  );
};

export default Boolean;
