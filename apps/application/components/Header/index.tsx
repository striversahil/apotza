"use client";
import { Input } from "@repo/ui/input";
import { Skeleton } from "@repo/ui/skeleton";
import React from "react";
import { useClickOutsideEnter } from "../../app/editor/_hooks/useClickOutsideEnter";
import GetProject from "../../actions/project";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditorPreview from "./EditorPreview";
import Deploy from "./Deploy";
import Avatar_Header from "./Avatar";

type Props = {};

const Header = (props: Props) => {
  const { isLoading, data } = GetProject.getProject();

  const navigation = useRouter();

  const { mutate } = GetProject.useNameChange();

  const { ref, mount, setMount, EnterClick, ValueChange, value } =
    useClickOutsideEnter(() => mutate({ name: value }), data?.payload.name);
  ref.current?.focus();

  return (
    <div className="fixed top-0 w-full h-[5vh] bg-slate-900 text-center flex">
      <div className="relative flex-1 w-full flex justify-center items-center">
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
      {!isLoading && (
        <div className="absolute top-0 left-0 items-center ml-2 mt-1">
          <Image
            src={"/apotzalogo.jpg"}
            width={50}
            height={50}
            alt="brand_pic"
            className=" cursor-pointer hover:animate-pulse"
            onClick={() => navigation.push("/dashboard")}
          />
        </div>
      )}

      {/* All Essential's Call to action Navigation Button */}
      {!isLoading && (
        <div className="absolute right-0 top-3 flex justify-center items-center gap-5 mx-5 ">
          <EditorPreview />
          <Deploy />
          <Avatar_Header />
        </div>
      )}
    </div>
  );
};

export default Header;
