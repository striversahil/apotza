import ProjectAction from "../../api/project/project";
import { Skeleton } from "../../components/ui/skeleton";
import { useQueryData } from "../../hooks/useQueryData";
import { useNavigate } from "react-router";
import React from "react";

type Props = {};

const ProjectIndex = (props: Props) => {
  const redirect = useNavigate();
  const { isLoading, data } = useQueryData(["project"], ProjectAction.getOne);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="w-screen h-screen rounded-md " />
      </div>
    );
  }

  if (data && data.statusCode === 401) {
    redirect("/login");
  }

  if (data && data.statusCode === 200) {
    redirect(`/project/${data.payload._id}`);
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default ProjectIndex;
