import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { RunnerController } from "../controller/runner.controller.ts";

const app = new Hono();

app.post("/:id", RunnerController.index);

serve(
  {
    fetch: app.fetch,
    port: 8081,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export default app;
