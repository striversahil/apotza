import React from "react";
import { Input } from "@repo/ui/input";
import { cn } from "@/lib/utils";
import { textCommon as Default } from "@repo/common";
import { Label } from "@repo/ui/label";

type Props = {
  content?: typeof Default.content;
  appearance?: typeof Default.appearance;
  layout?: typeof Default.layout;
};

export const Component = ({
  content = Default.content,
  appearance = Default.appearance,
  layout = Default.layout,
}: Props) => {
  return (
    <div
      className="flex select-none size-full"
      style={{
        padding: `${layout.padding}px`,
        overflow: `${layout.scrollOverflow}`,
        visibility: layout.visible.value ? "visible" : "hidden",
        alignItems: `${appearance.verticalAlign}`,
        justifyContent: `${appearance.horizontalAlign}`,
        backgroundColor: `${appearance.backgroundColor}`,
        borderColor: `${appearance.borderColor}`,
        borderWidth: `${appearance.borderWidth.value}px`,
        borderRadius: `${appearance.borderRadius.value}px`,
      }}
    >
      {appearance.icon && (
        <div
          className="mr-2"
          style={{
            fontSize: `${appearance.fontSize.value}px`,
          }}
        >
          {appearance.icon}
        </div>
      )}
      <Label
        style={{
          fontSize: `${appearance.fontSize}px`,
          fontWeight: `${appearance.fontWeight}`,
          color: `${appearance.textColor}`,
        }}
      >
        {content.text.value}
      </Label>
    </div>
  );
};

export { Default };
