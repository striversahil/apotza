import React from "react";
import { useStepConfig } from "../utils/useSaveStepConfig";
import IDEeditor from "../IDEditor";

import { Input } from "@repo/ui/input";
import _, { set } from "lodash";
import { X } from "lucide-react";
import RestEndpoint from "./Endpoint";
import RestHeader from "./header";

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
    <div className="relative w-full h-full overflow-y-auto px-5 bg-black/10">
      {/* Endpoint and Fetching Method Block */}
      <RestApiTitle>Endpoint</RestApiTitle>
      <RestEndpoint stepConfig={stepConfig} setStepBlock={setStepBlock} />
      {/* Request Header Block */}
      <div className="">
        <RestApiTitle>Headers</RestApiTitle>
        <div className="w-full h-full flex flex-col gap-2">
          {stepConfig.configuration.headers.map(
            (header: any, index: number) => (
              <div className="relative flex gap-2" key={index}>
                <RestHeader
                  stepConfig={stepConfig}
                  setStepBlock={setStepBlock}
                  header={header}
                  index={index}
                />
              </div>
            )
          )}
        </div>
        <button
          onClick={() => {
            setStepBlock({
              headers: [
                ...stepConfig.configuration.headers,
                {
                  key: { value: "", config: "" },
                  val: { value: "", config: "" },
                },
              ],
            });
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
            code={stepConfig.configuration.body}
            onChange={(body) => setStepBlock({ body: body })}
            language="json"
          />
        </div>
      </div>
    </div>
  );
};

export default RestConfig;
