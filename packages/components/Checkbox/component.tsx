import { Input } from "../../ui/src/input";
import { cn } from "@/lib/utils";
import React from "react";
import Default from "./default.json";
import { Label } from "../../ui/src/label";

type Props = {
  content?: typeof Default.content;
  appearance?: typeof Default.appearance;
  layout?: typeof Default.layout;
  interaction?: typeof Default.interaction;
  eventHandler?: typeof Default.eventHandler;
};

export const Component = ({
  content = Default.content,
  appearance = Default.appearance,
  layout = Default.layout,
  interaction = Default.interaction,
}: Props) => {
  return (
    <div
      className="flex"
      style={{
        width: `${layout.width}px`,
        height: `${layout.height}px`,
        visibility: layout.visible ? "visible" : "hidden",
        alignItems: `${appearance.verticalAlign}`,
        justifyContent: `${appearance.horizontalAlign}`,
      }}
    >
      <Input
        type="checkbox"
        checked={content.defaultChecked}
        required={interaction.required}
        disabled={interaction.disabled}
        className="mr-2 w-4 h-4"
        onChange={(e) => {
          console.info(e.target.checked);
        }}
      />
      <Label
        className="text-white"
        style={{
          fontSize: `${appearance.fontSize}px`,
          color: `${appearance.textColor}`,
        }}
      >
        {content.label}
      </Label>
    </div>
  );
};
