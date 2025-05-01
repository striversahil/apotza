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
import _, { set } from "lodash";
import { X } from "lucide-react";

type Props = {};

const RestApiTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex items-center mt-5 mb-2 text-sm font-bold">
      {children}
    </div>
  );
};

const RestConfig = (props: Props) => {
  const { stepConfig, setStepBlock } = useStepConfig();

  return (
    <div className="relative w-full h-full overflow-y-auto px-5">
      {/* Endpoint and Fetching Method Block */}
      <RestApiTitle>Endpoint</RestApiTitle>
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
      {/* Request Header Block */}
      <div className="">
        <RestApiTitle>Headers</RestApiTitle>
        <div className="w-full h-full flex flex-col gap-2">
          {stepConfig.config.headers.map((header: any, index: number) => (
            <div className="relative flex gap-2" key={index}>
              <Input
                defaultValue={header["key"]}
                onChange={(e) =>
                  setStepBlock({
                    headers: stepConfig.config.headers.map(
                      (h: any, i: number) =>
                        i === index
                          ? { key: e.target.value, value: header["value"] }
                          : h
                    ),
                  })
                }
              />
              <Input
                defaultValue={header["value"]}
                onChange={(e) =>
                  setStepBlock({
                    headers: stepConfig.config.headers.map(
                      (h: any, i: number) =>
                        i === index
                          ? { key: header["key"], value: e.target.value }
                          : h
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
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setStepBlock({ headers: [...stepConfig.config.headers, {}] });
          }}
          className="text-xs text-muted-foreground hover:text-white/80 duration-200"
        >
          Add Header
        </button>
      </div>
      {/* Request Body Block */}
      <div className="w-full h-[200px]">
        <RestApiTitle>Body</RestApiTitle>
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
