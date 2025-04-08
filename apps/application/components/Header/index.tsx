"use client";
import { Input } from "@repo/ui/input";
import { Skeleton } from "@repo/ui/skeleton";
import React from "react";
import { useClickOutsideEnter } from "../../app/editor/_hooks/useClickOutsideEnter";
import ProjectAction from "../../actions/project";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@repo/ui/Tooltip/tooltip";
import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
  const { isLoading, data } = ProjectAction.getProject();

  const { mutate } = ProjectAction.useNameChange();

  const { ref, mount, setMount, EnterClick, ValueChange, value } =
    useClickOutsideEnter(() => mutate({ name: value }), data?.payload.name);
  ref.current?.focus();

  return (
    <div className="fixed top-0 w-full h-[5vh] bg-slate-900 text-center flex">
      <div className="flex absolute top-0 left-0 items-center ml-2 mt-1">
        <Image
          src={"/apotzalogo.jpg"}
          width={50}
          height={50}
          alt="brand_pic"
          className=" cursor-pointer hover:animate-pulse"
          onClick={() => window.location.reload()}
        />
      </div>
      <div className="flex-1 w-full flex justify-center items-center ">
        {isLoading && <Skeleton className="w-[500px] h-[40px] rounded-md" />}

        {!isLoading && !mount && (
          <h1
            className="text-2xl text-white font-bold text-center"
            onClick={() => setMount(true)}
          >
            {data?.payload.name}
          </h1>
        )}
        {!isLoading && mount && (
          <Input
            className="w-[200px] h-[40px] bg-inherit rounded-md"
            ref={ref}
            value={value}
            autoFocus
            onChange={ValueChange}
            onKeyDown={EnterClick}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
