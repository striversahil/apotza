"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import Image from "next/image";
import StepsBlockAction from "../../../actions/project/stepsBlock";
import TabBlockAction from "../../../actions/project/apiBlock";
import languages from "@/common/Json/languages.json";

type PopOver = {
  setOpen: (open: boolean) => void;
  codeBlock_id: string;
  type: "tab" | "step";
};

export function ComboPopAPI({ setOpen, codeBlock_id, type }: PopOver) {
  const [value, setValue] = React.useState("");

  const { mutate: mutateTabAdd } = TabBlockAction.add();
  const { mutate: mutateStepAdd } = StepsBlockAction.add(codeBlock_id);

  return (
    <PopoverContent className="w-[200px] p-0 border-[2px] border-black shadow-lg rounded-md">
      <Command className="bg-slate-900">
        <CommandInput placeholder="Search Provider..." />
        <CommandList>
          <CommandEmpty>No API Provider found.</CommandEmpty>
          <CommandGroup className="">
            <div className="flex flex-col ">
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue: any) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    if (type === "tab") {
                      mutateTabAdd({
                        name: language.label,
                        language: language.value,
                      });
                    }
                    if (type === "step") {
                      mutateStepAdd({
                        id: codeBlock_id,
                        language: language.value,
                      });
                    }
                  }}
                  className=" p-1 py-2 rounded-md border-none cursor-pointer flex items-center gap-2"
                >
                  <Image
                    src={language.icon_href}
                    alt={language.label}
                    width={20}
                    height={20}
                    priority
                  />
                  <span className="w-full text-left">{language.label}</span>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
}
