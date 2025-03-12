import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import "../styles.css";
import App from "../src/App";
import SignIn from "../pages/(auth)/login";
import SignUp from "../pages/(auth)/signup";
import DashboardLayout from "app/pages/dashboard/layout";
import Dashboard from "app/pages/dashboard";
import WorkspaceId from "app/pages/dashboard/[workspaceId]";
import WorkspaceLayout from "app/pages/dashboard/[workspaceId]/layout";
import ProjectIndex from "app/pages/project";
import ProjectIndexLayout from "app/pages/project/[appId]/layout";
import ProjectEditLayout from "app/pages/project/[appId]/edit/layout";
import ProjectEdit from "app/pages/project/[appId]/edit";
import ProjectPreview from "app/pages/project/[appId]/preview";
import ProjectWorkflow from "app/pages/project/[appId]/workflow";
// import Root from "../root";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
    <div className="text-2xl font-bold px-5">Hello there</div>
  </StrictMode>
);
