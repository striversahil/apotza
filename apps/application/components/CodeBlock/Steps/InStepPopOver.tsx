import { Popover } from "@repo/ui/popover";
import { PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import { AlignJustify, Copy, PlusCircle, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { ComboPopAPI } from "../utils/PopOverSelect";
import StepsBlockAction from "../../../actions/project/stepsBlock";
import languages from "@/common/Json/languages.json";
import Image from "next/image";
import { TabsTrigger } from "@radix-ui/react-tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/Tooltip/tooltip";
import { useCurrentStep } from "../../../contexts/CurrentTab";
import { cn } from "@/lib/utils";

type Props = {
  value: any;
  codeBlock_id: string;
};

const InStepPopOver = ({ value, codeBlock_id }: Props) => {
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const { currentStep, setCurrentStep = (step: string) => {} } =
    useCurrentStep() || {};

  const { mutate } = StepsBlockAction.delete(codeBlock_id);

  const { mutate: mutateDuplicate } = StepsBlockAction.duplicate(codeBlock_id);

  const languageHref =
    (value.type &&
      languages.find((item) => item.value === value.type)?.icon_href) ||
    "/assets/languages/python.svg";

  return (
    <div>
      <div
        className={cn(
          "bg-white/15 w-full p-2 rounded-md flex items-center justify-center hover:bg-white/20 cursor-pointer",
          currentStep === value.id &&
            "outline outline-2 outline-blue-500 bg-white/25"
        )}
      >
        <TabsTrigger
          className="w-full"
          value={value.id}
          onClick={() => setCurrentStep(value.id)}
        >
          <div className="font-bold flex-1 flex w-full text-center cursor-pointer">
            <Image
              src={languageHref}
              width={25}
              height={25}
              alt="Image"
              className="  rounded-md"
            />
            <div className="text-sm flex-1 text-center  ">{value.name}</div>
          </div>
        </TabsTrigger>
        <Popover open={open2} onOpenChange={setOpen2}>
          <PopoverTrigger className="">
            <AlignJustify className="size-4 " />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="flex flex-col p-2 rounded-md gap-2">
              <div
                className="bg-white/40 flex items-center hover:bg-white/20 p-1 rounded-md cursor-pointer"
                onClick={() => {
                  setOpen2(false);
                  mutateDuplicate({
                    id: value.id,
                  });
                }}
              >
                <Copy className="size-4" />
                <div className="text-sm ml-2 border-l border-l-gray-200 pl-2">
                  Duplicate Step
                </div>
              </div>
              <div
                className="bg-red-800 text-sm flex items-center hover:bg-red-900 p-1 rounded-md cursor-pointer"
                onClick={() => {
                  setOpen2(false);
                  mutate({
                    id: value.id,
                  });
                }}
              >
                <Trash2 className="size-4" />
                <div className="text-sm ml-2 border-l border-l-gray-200 pl-2">
                  Delete Step
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full flex justify-center cursor-pointer">
          <PlusCircle className="size-4 hover:size-6 duration-200 active:rotate-90" />
          {/* <Tooltip>
            <TooltipTrigger>
              <PlusCircle className="size-4 hover:size-6 duration-200 active:rotate-90" />
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-sm">Add Step</span>
            </TooltipContent>
          </Tooltip> */}
        </PopoverTrigger>
        <ComboPopAPI
          setOpen={setOpen}
          codeBlock_id={codeBlock_id}
          type="step"
        />
      </Popover>
    </div>
  );
};

export default InStepPopOver;
