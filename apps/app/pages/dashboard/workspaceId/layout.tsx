// import { getWorkspaceInfo } from "@actions/user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router";

export default async function WorkspaceLayout() {
  // const { workspaceId } = props.workspaceId;
  // await queryClient.prefetchQuery({
  //   queryKey: ["workspace"],
  //   queryFn: () => getWorkspaceInfo("6791d2eccf19972f98849982"),
  //   staleTime: 1000 * 60 * 60,
  // });

  return (
    <div>
      <Outlet />
    </div>
  );
}
