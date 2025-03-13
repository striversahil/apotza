import { useState } from "react";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SignIn from "../pages/auth/login";
import SignUp from "../pages/auth/signup";
import DashboardLayout from "app/pages/dashboard/layout";
import Dashboard from "../pages/dashboard";
import WorkspaceId from "../pages/dashboard/workspaceId";
import WorkspaceLayout from "../pages/dashboard/workspaceId/layout";
import ProjectIndex from "../pages/project";
import ProjectIndexLayout from "../pages/project/appId/layout";
import ProjectEditLayout from "../pages/project/appId/edit/layout";
import ProjectEdit from "../pages/project/appId/edit";
import ProjectPreview from "../pages/project/appId/preview";
import ProjectWorkflow from "../pages/project/appId/workflow";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        index
        element={<div className="text-green-400 bg-blue-500">Home</div>}
      />
      {/* <Route path="/" element={<App />} /> */}
      {/* Authentication Routes */}
      <Route path="auth">
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      {/* Dashboard Routes */}
      <Route path="dashboard">
        <Route index element={<Dashboard />} />
        <Route element={<WorkspaceLayout />}>
          <Route path=":workspaceId" element={<WorkspaceId />} />
        </Route>
      </Route>
      {/* Project Routes */}
      <Route path="project">
        <Route index element={<ProjectIndex />} />{" "}
        {/* Deployed Project Route */}
        <Route path=":id" element={<ProjectIndexLayout />}>
          {/* Project Edit */}
          <Route path="edit" element={<ProjectEditLayout />}>
            <Route index element={<ProjectEdit />} />
          </Route>
          {/* Project Preview */}
          <Route path="preview" element={<ProjectPreview />} />
          {/* Workflow */}
          <Route path="workflow" element={<ProjectWorkflow />} />
        </Route>
      </Route>
      {/* Authentication Routes */}
    </Routes>
  );
}

export default App;
