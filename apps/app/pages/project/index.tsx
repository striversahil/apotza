import { Skeleton } from "../../components/ui/skeleton";
import { useQueryData } from "../../hooks/useQueryData";
import { useNavigate } from "react-router";
import React from "react";
import ProjectAction from "../../../app/actions/project";

type Props = {};

const ProjectIndex = (props: Props) => {
  const redirect = useNavigate();
  const { isLoading, data } = ProjectAction.getProject();

  console.log(data);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="w-screen h-screen rounded-md " />
      </div>
    );
  }

  if (data && data.statusCode === 401) {
    redirect("/auth/login");
  }

  if (data && data.success === true) {
    redirect(`/project/${data.payload.id}/edit`);
  }

  return <div>Hello there</div>;
};

export default ProjectIndex;
