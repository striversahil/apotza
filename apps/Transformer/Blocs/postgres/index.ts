import pg from "pg";

type PGConnection = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

const PostgresEngine = async (query: string, connection: PGConnection) => {
  const client = new pg.Client({
    user: connection.user,
    password: connection.password,
    host: connection.host,
    port: connection.port,
    database: connection.database,
  });

  try {
    await client.connect();

    const result = await client.query(query);

    if (!result) {
      return {
        error: "Something went wrong , please try again",
        data: null,
      };
    }

    if (result.rows.length === 0) {
      return {
        error: "No data found",
        data: null,
      };
    }

    if (result.rows.length > 0) {
      return {
        error: null,
        data: result.rows, // It's Returning Data that need to be transformed
      };
    }

    //
    return {
      error: null,
      data: null,
    };
  } catch (error) {
    return {
      error: error as string,
      data: null,
    };
  } finally {
    // Closing Connection to Database
    await client.end();
  }
};

export default PostgresEngine;
