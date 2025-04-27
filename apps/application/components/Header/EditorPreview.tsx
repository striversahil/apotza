import { cn } from "@/lib/utils";
import { Switch } from "@repo/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/Tooltip/tooltip";
import { Pencil, PlayIcon } from "lucide-react";
import React from "react";

type Props = {};

const EditorPreview = (props: Props) => {
  const [isEditor, setIsEditor] = React.useState(true);

  return (
    <Tooltip>
      <div className="flex items-center justify-center gap-2">
        <TooltipTrigger>
          <div
            className={`relative w-[78px] top-[2px] h-9 bg-white/20 rounded-full peer inline-flex shrink-0 cursor-pointer items-center transition-colors `}
            onClick={() => setIsEditor(!isEditor)}
          >
            <div
              className={cn(
                "mx-[5px] w-8 h-8 bg-white/30 rounded-full transition-transform shadow-inner shadow-white/30",
                !isEditor && "translate-x-9",
                isEditor && "translate-x-0"
              )}
            />

            <Pencil
              fill="white"
              size={19}
              className="absolute left-[10px] top-2"
            />

            <PlayIcon
              fill="white"
              size={20}
              className="absolute right-[10px] top-2"
            />
          </div>
        </TooltipTrigger>
        {isEditor && (
          <TooltipContent side="right">Switch to Preview</TooltipContent>
        )}
        {!isEditor && (
          <TooltipContent side="left">Switch to Editor</TooltipContent>
        )}
      </div>
    </Tooltip>
  );
};

export default EditorPreview;
