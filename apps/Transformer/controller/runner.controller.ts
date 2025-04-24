import type { Context } from "hono";
import RestEngine from "../Blocs/Rest/index.ts";
import { endTime, startTime } from "hono/timing";

// c.req.param("id")

export const RunnerController = {
  async Rest(c: Context) {
    const { endpoint, headers, body } = await c.req.json();

    if (!endpoint) {
      return c.json({
        success: false,
        message: "Endpoint is required",
        output: null,
      });
    }

    if (!headers) {
      return c.json({
        success: false,
        message: "Headers is required",
        output: null,
      });
    }

    if (!body) {
      return c.json({
        success: false,
        message: "Body is required",
        output: null,
      });
    }

    const { error, data } = await RestEngine(endpoint, headers, body);

    if (error) {
      return c.json({
        success: false,
        message: error,
      });
    }

    return c.json({
      success: true,
      message: "Data Fetched Successfully",
      output: data,
    });
  },
};
