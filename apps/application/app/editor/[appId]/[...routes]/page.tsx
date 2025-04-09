"use client";
import React, { useEffect, useRef } from "react";

import ProjectAction from "@/actions/project";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Section from "../../../../components/EditorCanvas/Section";
import AddSection from "../../../../components/EditorCanvas/Section/AddSection";
import DeleteSection from "../../../../components/EditorCanvas/Section/DeleteSection";
import _ from "lodash";
import { useContextSave } from "../../_hooks/useContextSave";
import { useWidthDrag } from "../../_hooks/useWidthDrag";

type Props = {};

const page = (props: Props) => {
  const [Page, setPage] = React.useState<any | null>(null);
  const navigate = useRouter();
  const path = usePathname();
  const { isLoading, data, isError } = ProjectAction.getPage(
    path.split("/")[3] || ""
  );
  const ref = useRef(null);
  const { setState } = useContextSave(Page);
  useWidthDrag(ref);

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
    <div
      className="pb-[500px] h-full w-full"
      ref={ref}
      onMouseUp={(e) => setState(e)}
    >
      {Page?.sections.map((item: any) => (
        <div key={item.id} className="relative w-full h-full">
          <Section value={item} />
          <DeleteSection id={item.id} />
          <AddSection />
        </div>
      ))}
    </div>
  );
};

export default page;
