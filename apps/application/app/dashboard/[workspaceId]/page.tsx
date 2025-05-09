"use client";
import { usePathname } from "next/navigation";
import { ApplicationSelectionBoxes } from "../_components/application";
import React from "react";
import Sidebar from "../_components/Sidebar";
import {
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@repo/ui/Sidebar/sidebar";
import { useQueryData } from "@/hooks/useQueryData";

type Props = {
  params: {
    workspaceId: string;
  };
};

const page = () => {
  // Next js is not allowing me to put this data into JSX
  const path = usePathname();

  const { data, isLoading } = useQueryData(["workspace"], getWorkspaceInfo);

  return (
    <SidebarProvider>
      <div className="flex w-full bg-slate-950 gap-1">
        <Sidebar />
        <main className="flex-1 w-full bg-transparent">
          <SidebarTrigger />
          <SidebarRail />
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">
              Here is the Dashboard Available for{" "}
              <span className="text-blue-500 select-none">
                {isLoading ? "Loading" : data?.payload.name}
              </span>{" "}
            </h1>
            {(isLoading ?? data) ? (
              <div>Loading...</div>
            ) : (
              <ApplicationSelectionBoxes data={data} isLoading={isLoading} />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default page;
