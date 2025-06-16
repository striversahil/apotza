import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use("*", prettyJSON());
// app.use()

app.get("/", (c) => {
  console.log("Received a request at the root endpoint");
  //   console.log("Headers:", c.req.);

  return c.json({
    message: "Welcome to the Refetch API",
  });
});

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

serve(
  {
    fetch: app.fetch,
    port: 8082,
    hostname: "localhost",
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  }
);
