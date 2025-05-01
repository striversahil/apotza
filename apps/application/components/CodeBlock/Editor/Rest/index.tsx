import React from "react";
import { useStepConfig } from "../utils/useSaveStepConfig";
import IDEeditor from "../IDEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { Input } from "@repo/ui/input";
import _ from "lodash";

type Props = {};

const RestConfig = (props: Props) => {
  const { stepConfig, setStepBlock } = useStepConfig();

  return (
    <div className="relative w-full h-full overflow-y-auto">
      <div className="w-full flex gap-5">
        <Select
          onValueChange={(method) => setStepBlock({ method })}
          defaultValue={stepConfig.config.method}
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
            placeholder="URL"
            defaultValue={stepConfig.config.endpoint}
            onChange={(e) => setStepBlock({ endpoint: e.target.value })}
          />
        </div>
      </div>
      <div className="w-full h-full">
        <div>Json Body</div>
        <div className="w-full h-full">
          <IDEeditor
            code={JSON.stringify(stepConfig.config.body, null, 2)}
            onChange={(body) => setStepBlock({ body: JSON.parse(body) })}
            language="json"
          />
        </div>
      </div>
    </div>
  );
};

export default RestConfig;
