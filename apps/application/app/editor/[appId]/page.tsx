"use client";
import ProjectAction from "@/actions/project";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { isLoading, data, isError } = ProjectAction.getProject();

  const navigate = useRouter();

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    navigate.push("/login");
  }

  if (data && data.success === true) {
    navigate.push(`/editor/${data.payload.id}/${data.payload.pages[0].name}`);
  }

  return <div className="w-full h-full bg-inherit"></div>;
};

export default page;
