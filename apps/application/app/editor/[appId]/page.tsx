"use client";
import GetProject from "@/actions/project";
import { SimpleLoader } from "@/components/loader";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { isLoading, data, isError } = GetProject.getProject();

  const navigate = useRouter();

  if (isLoading) {
    return <SimpleLoader size={25} />;
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
