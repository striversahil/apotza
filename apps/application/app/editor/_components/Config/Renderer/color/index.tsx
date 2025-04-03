import React, { useCallback } from "react";
import { Input } from "../../../../../../components/ui/input";
import _ from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../../../../components/ui/select";
import { HexColorPicker } from "react-colorful";
import useDebouncedUpdate from "../utils/debouce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

type Props = {
  location: Array<string>;
  initialvalue: string;
};

// I will get Full Config of the Component Here

export const Color: React.FC<Props> = ({ location, initialvalue }: Props) => {
  const [value, setValue] = React.useState<string>(initialvalue);

  useDebouncedUpdate(location, value);

  return (
    <div className="relative float-end gap-2 ">
      <Popover>
        <PopoverTrigger
          className={`p-2 overflow-hidden rounded-lg text-sm font-bold font-sans cursor-pointer shadow-lg shadow-[${value}] bg-white/10 hover:bg-white/20`}
        >
          <div
            style={{
              backgroundColor: value,
              borderRadius: "100%",
              width: "25px",
              height: "25px",
            }}
            className=""
          ></div>
        </PopoverTrigger>
        <PopoverContent side="right">
          <HexColorPicker
            color={value}
            onChange={(value) => setValue(value)}
            className="absolute"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
