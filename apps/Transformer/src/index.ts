import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { RunnerController } from "../controller/runner.controller.ts";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { timing } from "hono/timing";

const app = new Hono();
app.use(logger());
app.use(prettyJSON());
app.use(
  "*",
  timing({
    enabled: true,
  })
);
app.use(
  cors({
    origin: "*",
  })
);

app.post("/rest", RunnerController.Rest);

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
