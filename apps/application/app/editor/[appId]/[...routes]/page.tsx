"use client";
import React, { useEffect } from "react";

import ProjectAction from "@/actions/project";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Section from "../../_components/EditorCanvas/Section";

type Props = {};

const page = (props: Props) => {
  const [Page, setPage] = React.useState<any | null>(null);
  const navigate = useRouter();
  const path = usePathname();
  const { isLoading, data, isError } = ProjectAction.getPage(
    path.split("/")[3] || ""
  );

  useEffect(() => {
    if (data) {
      setPage(data.payload);
    }
  }, [data]);

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
  return (
    <div>
      {Page?.sections.map((item: any) => (
        <div key={item.id}>
          <Section value={item} />
        </div>
      ))}
    </div>
  );
};

export default page;
