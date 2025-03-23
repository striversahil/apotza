import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import Default from "./default.json";

const Checkbox = ({
  configuration = Default.configuration,
  payload = Default.payload,
}: any) => {
  console.log("configuration", configuration);
  console.log("payload", payload);
  return (
    <div className="w-full flex justify-center items-center">
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
    </div>
  );
};

export default Checkbox;
