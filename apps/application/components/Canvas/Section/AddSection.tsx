import SectionAction from "../../../actions/project/section";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@repo/ui/Tooltip/tooltip";
import { PlusCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  id: string;
};

const AddSection = ({ id }: Props) => {
  const router = usePathname();
  const { mutate } = SectionAction.create();
  return (
    <div className="flex justify-center items-center ">
      <Tooltip>
        <TooltipTrigger className="flex">
          <div
            onClick={() =>
              mutate({
                page_id: id,
              })
            }
            className="cursor-pointer hover:text-blue-500 duration-300"
          >
            <PlusCircleIcon className="size-4 hover:size-5 hover:rotate-90 transition-all duration-300" />
          </div>
        </TooltipTrigger>
        <TooltipContent>Add Section</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default AddSection;
