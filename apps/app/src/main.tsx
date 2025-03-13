import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "../styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
const isDev = process.env.NODE_ENV !== "production";
const REACTWRAP = isDev ? React.Fragment : React.StrictMode;
// import Root from "../root";

const root = document.getElementById("root") as HTMLElement;

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router basename={import.meta.env.BASE_URL}>
        <App />
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
