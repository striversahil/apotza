import ProjectAction from "@/actions/project";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { isLoading, data } = ProjectAction.getProject();

  const navigate = useRouter();

  if (isLoading) {
    return (
      <div className="size-full flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (data && data.success === false) {
    navigate.push("/login");
  }

  if (data && data.success === true) {
    navigate.push(`/editor/${data.payload.id}/${data.payload.pages[0]}`);
  }
  return <div>page</div>;
};

export default page;
