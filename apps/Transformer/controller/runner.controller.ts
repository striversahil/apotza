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
    try {
      let { endpoint, headers, method, body } = await c.req.json();
      if (!method) {
        method = "get";
      }

      if (method !== "get" && !body) {
        return ErrorResponse(c, "Body is required");
      }

      if (!endpoint) {
        return ErrorResponse(c, "Endpoint is required");
      }
      if (!headers) {
        headers = [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ];
      }
      // if (!body) {
      //   return ErrorResponse(c, "Body is required");
      // }

      const { error, data } = await RestEngine(endpoint, headers, body, method);
      if (error) {
        return ErrorResponse(c, error);
      }
      return SuccessResponse(c, "Success to get data", data);
    } catch (error) {
      ErrorResponse(c, "", true);
    }
  }

  static async Postgres(c: Context) {
    try {
      const { query, connection } = await c.req.json();

      if (!query) {
        return ErrorResponse(c, "Query is required");
      }
      if (!connection) {
        return ErrorResponse(c, "Connection Credentials is required");
      }

      const { error, data } = await PostgresEngine(
        query.value,
        connection.value
      );
      if (error) {
        return ErrorResponse(c, error);
      }
      return SuccessResponse(c, "Success to get data", data);
    } catch (error) {
      ErrorResponse(c, "", true);
    }
  }

  static async JavaScript(c: Context) {
    try {
      const { code } = await c.req.json();
      if (!code) {
        return ErrorResponse(c, "Code is required");
      }

      const { error, data } = await JavaScriptEngine(code.value);
      if (error) {
        return ErrorResponse(c, error);
      }
      return SuccessResponse(c, "Success to get data", data);
    } catch (error) {
      ErrorResponse(c, "", true);
    }
  }

  static async Python(c: Context) {
    try {
      const { code } = await c.req.json();
      if (!code) {
        return ErrorResponse(c, "Code is required");
      }

      const { error, data } = await PythonEngine(code.value);
      console.log(data);
      if (error) {
        return ErrorResponse(c, error);
      }
      return SuccessResponse(c, "Success to get data", data);
    } catch (error) {
      ErrorResponse(c, "", true);
    }
  }
}

export default RunnerController;
