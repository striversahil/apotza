import SectionAction from "../../../../../actions/project/section";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@repo/ui/Tooltip/tooltip";
import { PlusCircleIcon } from "lucide-react";
import React from "react";

type Props = {};

const AddSection = (props: Props) => {
  const { mutate } = SectionAction.create();
  return (
    <div className="flex justify-center items-center py-2">
      <Tooltip>
        <TooltipTrigger className="flex">
          <button
            onClick={() => mutate({})}
            className="cursor-pointer hover:text-blue-500 duration-300"
          >
            <PlusCircleIcon />
          </button>
        </TooltipTrigger>
        <TooltipContent>Add Section</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default AddSection;
