import type { Context } from "hono";
import RestEngine from "../Blocs/Rest/index.ts";
import { endTime, startTime } from "hono/timing";
import { ErrorResponse, SuccessResponse } from "../util/ApiResponse.ts";
import PostgresEngine from "../Blocs/postgres/index.ts";
import JavaScriptEngine from "../Blocs/javascript/index.ts";
import PythonEngine from "../Blocs/python/index.ts";

// c.req.param("id")

class RunnerController {
  static async Rest(c: Context) {
    let { endpoint, headers, body } = await c.req.json();

    if (!endpoint) {
      return ErrorResponse(c, "Endpoint is required");
    }
    if (!headers) {
      headers = {
        "Content-Type": "application/json",
      };
    }
    // if (!body) {
    //   return ErrorResponse(c, "Body is required");
    // }

    const { error, data } = await RestEngine(endpoint, headers, body);
    if (error) {
      return ErrorResponse(c, error);
    }
    return SuccessResponse(c, "Success to get data", data);
  }

  static async Postgres(c: Context) {
    const { query, connection } = await c.req.json();

    if (!query) {
      return ErrorResponse(c, "Query is required");
    }
    if (!connection) {
      return ErrorResponse(c, "Connection is required");
    }

    const { error, data } = await PostgresEngine(query, connection);
    if (error) {
      return ErrorResponse(c, error);
    }
    return SuccessResponse(c, "Success to get data", data);
  }

  static async JavaScript(c: Context) {
    const { code } = await c.req.json();
    if (!code) {
      return ErrorResponse(c, "Code is required");
    }

    const { error, data } = await JavaScriptEngine(code, null);
    if (error) {
      return ErrorResponse(c, error);
    }
    return SuccessResponse(c, "Success to get data", data);
  }

  static async Python(c: Context) {
    const { code } = await c.req.json();
    if (!code) {
      return ErrorResponse(c, "Code is required");
    }

    const { error, data } = await PythonEngine(code, null);
    if (error) {
      return ErrorResponse(c, error);
    }
    return SuccessResponse(c, "Success to get data", data);
  }
}

export default RunnerController;
