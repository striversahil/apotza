import "dotenv/config";
import { sql } from "drizzle-orm";

import * as schema from "../schema";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_CONNECTION_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
export const connectDB = async () => {
  try {
    // Test query to verify database connection
    const result = await db.execute(sql`SELECT 1`);
    if (result) {
      console.log("Connected to database Successfully ✨");
    }
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};
