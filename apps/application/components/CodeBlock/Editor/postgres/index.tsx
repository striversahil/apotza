import React from "react";
import { useStepConfig } from "../utils/useSaveStepConfig";
import IDEeditor from "../IDEditor";

type Props = {};

const PostgresConfig = (props: Props) => {
  const { stepConfig, setStepBlock } = useStepConfig();

  return (
    <div className="flex flex-col w-full h-full">
      {/* <div className=" text-sm cursor-default text-muted-foreground hover:text-white/80 duration-200 m-2">
        Write Your PostgreSQL Query here :
      </div> */}
      <div className="relative w-full h-full">
        <div className="absolute inset-1 mb-12 bg-white/20 p-1 shadow-inner hover:bg-white/30 duration-200 shadow-black/50 rounded-lg overflow-hidden">
          <IDEeditor
            code={stepConfig.config.query}
            language={"sql"}
            onChange={(code) => {
              setStepBlock({ query: code });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostgresConfig;
