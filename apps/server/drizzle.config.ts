// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import postgres from "postgres";
// const queryConnection = postgres(process.env.DATABASE_URL!, {
//   ssl: { rejectUnauthorized: false },
//   prepare: false
// });

export default defineConfig({
  dialect: "postgresql",
  schema: ["./schema/**/*.ts"],
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
  },
});
