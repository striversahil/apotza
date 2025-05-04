"use client";
import React, { useEffect } from "react";
import IDEeditor from "../IDEditor";
import languages from "@/common/Json/languages.json";
import Image from "next/image";
import StepsBlockAction from "@/actions/project/stepsBlock";
import { StepBlockInterface } from "..";
import { TestTube2 } from "lucide-react";
import { Button } from "@repo/ui/button";
import { SimpleLoader } from "@/components/loader";

export const EditorHeader = ({ id, type, name }: StepBlockInterface) => {
  const { mutate, isPending } = StepsBlockAction.codeRunner(id);

  return (
    <div className="h-[50px] w-full flex gap-5 bg-gradient-to-r from-slate-800 to-slate-600">
      <Image
        className="ml-5 my-3 flex justify-center items-center shadow-md shadow-black bg-slate-900  rounded-md cursor-pointer select-none"
        src={
          languages.find((item) => item.value === type)?.icon_href || "/asset/"
        }
        alt="Image"
        width={30}
        height={35}
      />
      <div className="flex-1 flex h-full items-center">{name}</div>
      <Button
        className="flex bg-[#1c1369] text-white hover:bg-[#1c1369ab] shadow-md font-bold shadow-black/50 mt-2 items-center rounded-md text-sm p-2 mx-5"
        onClick={() => mutate({ id })}
        size={"sm"}
      >
        {isPending && <SimpleLoader size={20} />}
        {!isPending && <TestTube2 />}
        Test Step
      </Button>
    </div>
  );
};
