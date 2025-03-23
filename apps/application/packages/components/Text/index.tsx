import React from "react";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import Default from "./default.json";

const TextComponent = ({
  configuration = Default.configuration,
  payload = Default.payload,
}: any) => {
  console.log("configuration", configuration);
  console.log("payload", payload);
  return (
    <div className="w-[2000px] flex justify-center items-center">
      {/* {payload.text} */}
      <Input
        value={payload.text}
        style={{
          fontSize: `${configuration.fontSize}px`,
          padding: `${configuration.padding}px`,
          backgroundColor: `${configuration.backgroundColor}`,
          color: `${configuration.color}`,
        }}
      />
    </div>
  );
};

export default TextComponent;
