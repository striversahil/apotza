import React from "react";
import { Input } from "@repo/ui/input";
import useDebouncedUpdate from "../utils/debouce";
import { Switch } from "@repo/ui/switch";

type Props = {
  location: Array<string>;
  initialvalue: boolean;
};

export const Boolean = ({ location, initialvalue }: Props) => {
  const [value, setValue] = React.useState<boolean>(initialvalue);

  useDebouncedUpdate(location, value);

  return (
    <div className="flex w-full items-center">
      <div className="flex-1" />
      <Switch
        checked={value}
        onCheckedChange={() => setValue(!value)}
        className="h-5 w-10 data-[state=checked]:bg-sky-400 data-[state=unchecked]:bg-slate-700 duration-500 ease-in-out"
      />
    </div>
  );
};

export default Boolean;
