import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import Default from "./default.json";
import { Label } from "../../../components/ui/label";

type Props = {
  configuration?: any;
  payload?: any;
};

export const Component = ({
  configuration = Default.configuration,
  payload = Default.payload,
}: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <Input
        type="checkbox"
        readOnly
        checked={payload.checked}
        style={{
          // fontSize: `${configuration.fontSize}px`,
          scale: `${configuration.scale}`,
          borderRadius: `${configuration.borderRadius}px`,
          color: `${configuration.backgroundColor}`,
          // color: `${configuration.color}`,
        }}
      />
      <Label className="text-white">A Checkbox</Label>
    </div>
  );
};
