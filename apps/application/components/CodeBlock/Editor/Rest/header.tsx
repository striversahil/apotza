import React from "react";
import { useStepConfig } from "../utils/useSaveStepConfig";
import IDEeditor from "../IDEditor";

import { Input } from "@repo/ui/input";
import _, { set } from "lodash";
import { X } from "lucide-react";
import RestEndpoint from "./Endpoint";

type Props = {
  header: any;
  index: number;
};

const RestHeader = ({ header, index }: Props) => {
  const { stepConfig, setStepBlock } = useStepConfig();

  return (
    <>
      <Input
        defaultValue={header["key"]}
        onChange={(e) =>
          setStepBlock({
            headers: stepConfig.config.headers.map((h: any, i: number) =>
              i === index ? { key: e.target.value, value: header["value"] } : h
            ),
          })
        }
      />
      <Input
        defaultValue={header["value"]}
        onChange={(e) =>
          setStepBlock({
            headers: stepConfig.config.headers.map((h: any, i: number) =>
              i === index ? { key: header["key"], value: e.target.value } : h
            ),
          })
        }
      />
      <button
        onClick={() => {
          setStepBlock({
            headers: stepConfig.config.headers.filter(
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
