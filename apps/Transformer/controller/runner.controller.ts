import type { Context } from "hono";
import RestEngine from "../Blocs/Rest/index.ts";

// await c.req.json(),

// c.req.param("id")

export const RunnerController = {
  async index(c: Context) {
    const rest = RestEngine();
    return c.json({ message: "Hello World", rest });
  },
};
