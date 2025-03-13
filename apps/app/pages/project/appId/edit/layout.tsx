import React from "react";
import { Outlet } from "react-router";

const ProjectEditLayout = () => {
  return (
    <div suppressHydrationWarning suppressContentEditableWarning>
      <Outlet />
    </div>
  );
};

export default ProjectEditLayout;
