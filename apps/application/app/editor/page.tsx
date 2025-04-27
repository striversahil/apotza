"use client";
import GetProject from "@/actions/project";
import { Skeleton } from "@repo/ui/skeleton";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { isLoading, data, isError } = GetProject.getProject();

  const navigate = useRouter();

  if (isLoading) {
    return (
      <div className="size-full flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (data && data.success === true) {
    navigate.push(`/editor/${data.payload.id}`);
  }

  if (isError) {
    navigate.push("/login");
  }
};

export default page;
