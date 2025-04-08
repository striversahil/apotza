import React, { useCallback } from "react";
import { Input } from "@repo/ui/input";
import _ from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@repo/ui/select";
import { HexColorPicker } from "react-colorful";
import useDebouncedUpdate from "../utils/debouce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Color_Base from "../../base/color";

type Props = {
  location: Array<string>;
  initialvalue: string;
};

// I will get Full Config of the Component Here

export const Color: React.FC<Props> = ({ location, initialvalue }: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value);

  return (
    <div>
      <Color_Base value={value} onChange={setValue} />
    </div>
  );
};
