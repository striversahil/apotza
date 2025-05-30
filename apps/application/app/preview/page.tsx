"use client";
import GetProject from "@/actions/project";
import { Skeleton } from "@repo/ui/skeleton";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { isLoading, data } = GetProject.getProject();

  if (isLoading) {
    return (
      <div>
        <Skeleton className="w-screen h-screen rounded-md " />
      </div>
    );
  }

  if (data && data.success === false) {
    redirect("/login");
  }

  // if (data && data.success === true) {
  //   redirect(`/preview/${data.payload.id}`);
  // }

  return (
    <div>
      <div>Project</div>
      {JSON.stringify(data)}
    </div>
  );
};

export default page;
