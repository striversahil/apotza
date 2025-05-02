"use client";
import React, { useEffect, useRef } from "react";

import GetProject from "@/actions/project";
import { usePathname, useRouter } from "next/navigation";
import Section from "../../../../components/Canvas/Section";
import AddSection from "../../../../components/Canvas/Section/AddSection";
import DeleteSection from "../../../../components/Canvas/Section/DeleteSection";
import _, { debounce } from "lodash";
import { useContextSave } from "../../_hooks/useContextSave";
import { useResizePage } from "../../_hooks/useResizePage";
import { SimpleLoader } from "@/components/loader";

type Props = {};

const page = (props: Props) => {
  const [Page, setPage] = React.useState<any | null>(null);
  const navigate = useRouter();
  const path = usePathname();
  const { isLoading, data, isError } = GetProject.getPage(
    path.split("/")[3] || ""
  );
  const ref = useRef(null);
  const { setState } = useContextSave(Page);
  // Calling the custom hook to save Width
  useResizePage(ref, isLoading);
  // useWidthDrag(ref);

  useEffect(() => {
    if (data) {
      setPage(data.payload);
    }
  }, [data]);

  if (isLoading) return <SimpleLoader size={25} />;

  // if (isError) {
  //   navigate.push("/editor");
  // }

  return (
    <div
      className="relative pb-[1500px] h-full w-full"
      ref={ref}
      onClick={(e) => setState(e)}
    >
      {Page?.sections?.map((item: any) => (
        <div key={item.id} className="relative">
          <Section value={item} />
          <DeleteSection id={item.id} />
          <AddSection id={Page.id} />
        </div>
      ))}
    </div>
  );
};

export default page;
