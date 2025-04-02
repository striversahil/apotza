import React, { useEffect } from "react";
import { CardTitle } from "../../../../components/ui/card";
import {
  usePrevComponent,
  useUpdatedComponent,
} from "../../../../contexts/component";
import ComponentAction from "@/actions/project/component";
import { useSaveConfig } from "./hooks/useSaveConfig";

type Props = {
  name: string;
};

const ConfigHeader = ({ name }: Props) => {
  useSaveConfig();

  return (
    <CardTitle
      className="sticky top-0 z-50 border-[2px] border-white/50 select-none shadow-md shadow-white/10
    bg-gradient-to-tr from-slate-900 to-slate-700 text-2xl font-bold capitalize text-center pl-6  rounded-lg"
    >
      {name}
    </CardTitle>
  );
};

export default ConfigHeader;
