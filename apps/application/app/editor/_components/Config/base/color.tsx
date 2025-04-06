import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import React from "react";
import { HexColorPicker } from "react-colorful";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Color_Base = ({ value, onChange }: Props) => {
  return (
    <div>
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
              onChange={(value) => onChange(value)}
              className="absolute"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Color_Base;
