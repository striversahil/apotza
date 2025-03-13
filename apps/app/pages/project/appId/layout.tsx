"use client";
import React from "react";
import { Provider } from "react-redux";
import { useContext } from "react";
import { UtilityProvider } from "../../../contexts/utils";
import { Outlet } from "react-router";

const ProjectIndexLayout = () => {
  return (
    <div>
      <UtilityProvider>
        <Outlet />
      </UtilityProvider>
    </div>
  );
};

export default ProjectIndexLayout;
