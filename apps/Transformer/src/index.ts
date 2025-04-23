import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/user", (c) => {
  return c.text("zig Mother!");
});

serve(
  {
    fetch: app.fetch,
    port: 8081,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
