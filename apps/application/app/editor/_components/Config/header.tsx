import React, { useEffect } from "react";
import { CardTitle } from "../../../../../../packages/ui/src/card";
import {
  usePrevComponent,
  useUpdatedComponent,
} from "../../../../contexts/component";
import ComponentAction from "@/actions/project/component";
import { useSaveConfig } from "./hooks/useSaveConfig";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../../../packages/ui/src/Tooltip/tooltip";

type Props = {
  value: any;
};

const ConfigHeader = ({ value }: Props) => {
  useSaveConfig();
  const { mutate } = ComponentAction.delete(value.section);

  return (
    <CardTitle className="sticky flex top-0 z-50 items-center gap-2">
      <div
        className="flex-1 border-[2px] py-1 border-white/50 select-none shadow-md shadow-white/10
    bg-gradient-to-tr from-slate-900 to-slate-700 text-2xl font-bold capitalize text-center pl-6  rounded-lg"
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
