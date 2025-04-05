"use client";
import ProjectAction from "@/actions/project";
import { Skeleton } from "@repo/ui/skeleton";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  // const { isLoading, data } = ProjectAction.getProject();

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Skeleton className="w-screen h-screen rounded-md " />
  //     </div>
  //   );
  // }

  // if (data && data.success === false) {
  //   redirect("/login");
  // }

  // if (data && data.success === true) {
  //   redirect(`/editor/${data.payload.id}/${data.payload.name}`);
  // }

  return (
    <div className="size-full flex justify-center items-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default page;
