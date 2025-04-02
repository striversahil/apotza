"use client";
import ProjectAction from "@/actions/project";
import { Skeleton } from "../../components/ui/skeleton";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { isLoading, data } = ProjectAction.getProject();

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

  if (data && data.success === true) {
    redirect(`/editor/${data.payload.id}/edit`);
  }

  return (
    <div>
      <div>Project</div>
      {JSON.stringify(data)}
    </div>
  );
};

export default page;
