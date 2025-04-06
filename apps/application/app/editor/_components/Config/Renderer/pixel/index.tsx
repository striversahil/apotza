import React from "react";
import { Input } from "@repo/ui/input";
import useDebouncedUpdate from "../utils/debouce";


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
      
    </div>
  );
};

export default Pixel;
