import React from "react";

import ProjectAction from "@/actions/project";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  const navigate = useRouter();
  const path = usePathname();
  const { isLoading, data } = ProjectAction.getPage(path.split("/")[2] || "");

  if (isLoading) {
    return (
      <div className="size-full flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (data && data.success === false) {
    navigate.push("/editor");
  }
  return <div>Page : {JSON.stringify(data)}</div>;
};

export default page;
