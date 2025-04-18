import TabBlockAction from "../../../actions/project/tabBlock";
import { useClickOutsideEnter } from "../../../app/editor/_hooks/useClickOutsideEnter";
import { Input } from "@repo/ui/input";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@repo/ui/Tooltip/tooltip";
import { useMutationData } from "@/hooks/useMutation";
import { Pencil } from "lucide-react";
import React from "react";

type Props = {
  value?: any;
};

const HeaderChange = (props: Props) => {
  const { mutate } = TabBlockAction.useNameChange();

  const Mutation = () => {
    mutate({ metadata: { _id: props.value._id }, payload: { name: value } });
  };
  const { mount, setMount, ref, EnterClick, ValueChange, value } =
    useClickOutsideEnter(Mutation, props.value);

  return (
    <div>
      {!mount && (
        <div
          className="flex cursor-pointer w-full p-2 text-md text-center bg-blue-400 rounded-md shadow-lg"
          onClick={() => setMount(true)}
        >
          <span className="flex-1">
            <span className=" font-bold">{value}</span>
          </span>
          <div className="">
            <Tooltip>
              <TooltipTrigger>
                <Pencil className=" duration-100 fill-green-400 " />
              </TooltipTrigger>
              <TooltipContent>Change Name</TooltipContent>
            </Tooltip>
          </div>
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
          className="bg-transparent border-none text-center bg-black text-white"
        />
      )}
    </div>
  );
};

export default HeaderChange;
