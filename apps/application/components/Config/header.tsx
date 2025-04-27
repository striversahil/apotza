import React, { useEffect } from "react";
import { CardTitle } from "@repo/ui/card";
import {
  usePrevComponent,
  useUpdatedComponent,
} from "../../contexts/component";
import ComponentAction from "@/actions/project/component";
import { useSaveConfig } from "./hooks/useSaveConfig";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/Tooltip/tooltip";

type Props = {
  value: any;
};

const ConfigHeader = ({ value }: Props) => {
  useSaveConfig();
  const { mutate } = ComponentAction.delete(value.section);

  return (
    <CardTitle className="sticky h-12 flex top-0 pt-5 z-50 items-center gap-2 bg-slate-900">
      <div
        className="flex-1 border-[1px] py-1 border-white/30 select-none
    bg-gradient-to-tr from-slate-900 to-slate-700 text-2xl font-bold capitalize text-center pl-6  rounded-full"
      >
        {value.name}
      </div>
      <Tooltip>
        <TooltipTrigger>
          <Trash2
            size={20}
            className="cursor-pointer hover:text-red-500"
            onClick={() => mutate({ id: value.id })}
          />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Delete <br /> Component
        </TooltipContent>
      </Tooltip>
    </CardTitle>
  );
};

export default ConfigHeader;
