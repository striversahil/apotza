import React from "react";
import { useStepConfig } from "../utils/useSaveStepConfig";
import IDEeditor from "../IDEditor";

import { Input } from "@repo/ui/input";
import _, { set } from "lodash";
import { X } from "lucide-react";
import RestEndpoint from "./Endpoint";

type Props = {
  stepConfig: any;
  setStepBlock: (stepblock: any) => void;
  header: any;
  index: number;
};

const RestHeader = ({ stepConfig, setStepBlock, header, index }: Props) => {

  return (
    <>
      <Input
        defaultValue={header["key"].config}
        onChange={(e) =>
          setStepBlock({
            headers: stepConfig.configuration.headers.map((h: any, i: number) =>
              i === index ? { key: {...header["key"], config: e.target.value}, val: header["val"] } : h
            ),
          })
        }
      />
      <Input
        defaultValue={header["val"].config}
        onChange={(e) =>
          setStepBlock({
            headers: stepConfig.configuration.headers.map((h: any, i: number) =>
              i === index ? { key: header["key"], value: {...header["value"], config: e.target.value} } : h
            ),
          })
        }
      />
      <button
        onClick={() => {
          setStepBlock({
            headers: stepConfig.configuration.headers.filter(
              (h: any, i: number) => i !== index
            ),
          });
        }}
        className="text-sm text-red-500"
      >
        <X size={20} className="shadow-inner shadow-white/30" />
      </button>
    </>
  );
};

export default RestHeader;
