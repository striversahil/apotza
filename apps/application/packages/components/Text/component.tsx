import React from "react";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
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
    <div
      className="w-[100px] flex justify-center items-center"
      style={{
        paddingTop: `${configuration.paddingY}px`,
        paddingBottom: `${configuration.paddingY}px`,
        paddingLeft: `${configuration.paddingX}px`,
        paddingRight: `${configuration.paddingX}px`,
        backgroundColor: `${configuration.backgroundColor}`,
        borderRadius: `${configuration.borderRadius}px`,
      }}
    >
      <Label
        style={{
          fontSize: `${configuration.fontSize}px`,
          color: `${configuration.color}`,
        }}
      >
        {payload.text}
      </Label>
    </div>
  );
};
