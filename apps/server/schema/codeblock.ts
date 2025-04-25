import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { Page } from "./component";
import { Project, Workspace } from "./user";

// ++++++++++++++++++++++++++++++++++++++++++++++++ CodeBlock Tables +++++++++++++++++++++++++++++++++++++++++++++++++
export const CodeBlock = pgTable("codeblock", {
  id: uuid("id").defaultRandom().primaryKey(),
  project: uuid("project_id"),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type CodeBlockInterface = InferSelectModel<typeof CodeBlock>;

export const StepBlock = pgTable("stepblock", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  codeblock: uuid("codeblock_id"),
  config: jsonb("config").notNull().default({}),
  output: text("output").notNull(),
  stdout: text("stdout").notNull(),
  request: text("request").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type StepBlockInterface = InferSelectModel<typeof StepBlock>;

export const codeBlockRelations = relations(CodeBlock, ({ one, many }) => ({
  project: one(Project, {
    fields: [CodeBlock.project],
    references: [Project.id],
  }),
  stepBlocks: many(StepBlock),
}));

export const stepBlockRelations = relations(StepBlock, ({ one, many }) => ({
  codeBlock: one(CodeBlock, {
    fields: [StepBlock.codeblock],
    references: [CodeBlock.id],
  }),
}));
