"use client";
import React from "react";

import ProjectAction from "@/actions/project";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  const navigate = useRouter();
  const path = usePathname();
  const { isLoading, data, isError } = ProjectAction.getPage(
    path.split("/")[3] || ""
  );

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    navigate.push("/editor");
  }
  return <div>Page : {JSON.stringify(data)}</div>;
};

export default page;
