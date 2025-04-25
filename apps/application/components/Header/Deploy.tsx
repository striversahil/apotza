import { cn } from "@/lib/utils";
import { RocketIcon } from "lucide-react";
import React from "react";

type Props = {};

const Deploy = (props: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="flex items-center gap-2 bg-white/20 hover:bg-green-500 transition-colors cursor-pointer px-2 py-1 rounded-full border-2 overflow-hidden"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <RocketIcon
        size={20}
        fill="gray"
        className={cn(
          isHovered &&
            "transform duration-200 transition-transform ease-in fill-white repeat-infinite"
        )}
      />
      <div className="text-base font-bold select-none">Deploy</div>
    </div>
  );
};

export default Deploy;
