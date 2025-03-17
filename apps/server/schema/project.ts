import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { Workspace } from "./user";

export const Project = pgTable("project", {
  id: serial("id").primaryKey().unique(),
  workspaceId: serial("workspace_id")
    .notNull()
    .references(() => Workspace.id),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull().default("now()"),
});
