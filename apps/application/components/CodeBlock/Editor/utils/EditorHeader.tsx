"use client";
import React, { useEffect } from "react";
import IDEeditor from "../IDEditor";
import languages from "@/common/Json/languages.json";
import Image from "next/image";
import StepsBlockAction from "@/actions/project/stepsBlock";
import { StepBlockInterface } from "..";

export const EditorHeader = ({ id, type, name }: StepBlockInterface) => {
  const { mutate } = StepsBlockAction.codeRunner(id);
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
      <div
        className="flex items-center bg-black rounded-md p-2 mx-5"
        onClick={() => mutate({ id })}
      >
        Test API
      </div>
    </div>
  );
};
