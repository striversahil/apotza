import TabBlockAction from "../../../actions/project/apiBlock";
import { useClickOutsideEnter } from "../../../app/editor/_hooks/useClickOutsideEnter";
import { Input } from "@repo/ui/input";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@repo/ui/Tooltip/tooltip";
import { useMutationData } from "@/hooks/useMutation";
import { Pencil, PlayCircle } from "lucide-react";
import React from "react";
import { Button } from "@repo/ui/button";

type Props = {
  value: any;
};

const HeaderChange = (props: Props) => {
  const { mutate } = TabBlockAction.delete();

  const Mutation = () => {
    mutate({ id: props.value.id, name: value });
  };
  const { mount, setMount, ref, EnterClick, ValueChange, value } =
    useClickOutsideEnter(Mutation, props.value.name);

  return (
    <div className="flex p-2 gap-2 items-center ">
      <div className="flex bg-[#344a5e] shadow-sm shadow-white/50 cursor-pointer w-full  rounded-3xl ">
        <div
          onClick={() => setMount(true)}
          className="flex flex-1 text-md  text-xl text-center font-bold"
        >
          {!mount && (
            <div className="flex-1 py-2">
              <div className="">{value}</div>
            </div>
          )}
          {mount && (
            <Input
              type="text"
              ref={ref}
              value={value}
              autoFocus
              onKeyDown={EnterClick}
              onChange={ValueChange}
              className="border-none text-center h-full bg-inherit ring-0 outline-none focus:outline-none"
            />
          )}
        </div>
      </div>
      <div className="" onClick={(e) => e.preventDefault()}>
        <Button
          className="text-xs font-bold text-white bg-[#197b94] shadow-md shadow-black/50  hover:bg-[#1e92af91]"
          size={"sm"}
        >
          <PlayCircle className="" />
          Run API
        </Button>
      </div>
    </div>
  );
};

export default HeaderChange;
