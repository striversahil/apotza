import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { useStepConfig } from "../utils/useSaveStepConfig";
import IDEeditor from "../IDEditor";

import { Input } from "@repo/ui/input";

type Props = {
  stepConfig: any;
  setStepBlock: (stepblock: any) => void;
};

const RestEndpoint = ({ stepConfig , setStepBlock }: Props) => {

  return (
    <div className="w-full flex gap-5">
      <Select
        onValueChange={(method) => setStepBlock({ method })}
        defaultValue={stepConfig.configuration.method}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
          <SelectItem value="PATCH">PATCH</SelectItem>
        </SelectContent>
      </Select>
      <div className="w-full">
        <Input
          placeholder="Enter Endpoint"
          defaultValue={stepConfig.configuration.endpoint.config}
          onChange={(e) =>
            setStepBlock({
              endpoint: {
                ...stepConfig.configuration.endpoint,
                config: e.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default RestEndpoint;
