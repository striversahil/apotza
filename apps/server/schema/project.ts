import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { Workspace } from "./user";
import { InferSelectModel, relations } from "drizzle-orm";

export const Project = pgTable("project", {
  id: serial("id").primaryKey(),
  workspace: serial("workspace_id")
    .notNull()
    .references(() => Workspace.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  details: text("details").notNull().default("Some details about this project"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type ProjectInterface = InferSelectModel<typeof Project>;

// +++++++++++++++++++++++++++++++++++++++++++++++++ Components Tables +++++++++++++++++++++++++++++++++++++++++++++++++

export const Section = pgTable("section", {
  id: serial("id").primaryKey(),
  project: serial("project_id")
    .notNull()
    .references(() => Project.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  layout: jsonb("layout").notNull().default({}),
  appearence: jsonb("appearence").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type SectionInterface = InferSelectModel<typeof Section>;

export const Component = pgTable("component", {
  id: serial("id").primaryKey(),
  section: serial("section_id")
    .notNull()
    .references(() => Section.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  coordinates: jsonb("coordinates").notNull().default({}),
  payload: jsonb("payload").notNull().default({}), // Contains the component data
  configuration: jsonb("configuration").notNull().default({}), // Contains the component configuration
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type ComponentInterface = InferSelectModel<typeof Component>;

export const componentRelations = relations(Component, ({ one, many }) => ({
  section: one(Section, {
    fields: [Component.section],
    references: [Section.id],
  }),
}));

export const sectionRelations = relations(Section, ({ one, many }) => ({
  project: one(Project, {
    fields: [Section.project],
    references: [Project.id],
  }),
  components: many(Component),
}));

// ++++++++++++++++++++++++++++++++++++++++++++++++ CodeBlock Tables +++++++++++++++++++++++++++++++++++++++++++++++++
export const CodeBlock = pgTable("codeblock", {
  id: serial("id").primaryKey().unique(),
  project: serial("project_id")
    .notNull()
    .references(() => Project.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type CodeBlockInterface = InferSelectModel<typeof CodeBlock>;

export const StepBlock = pgTable("stepblock", {
  id: serial("id").primaryKey().unique(),
  codeblock: serial("codeblock_id")
    .notNull()
    .references(() => CodeBlock.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  output: text("output").notNull(),
  stdout: text("stdout").notNull(),
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

export const projectRelations = relations(Project, ({ one, many }) => ({
  workspace: one(Workspace, {
    fields: [Project.workspace],
    references: [Workspace.id],
  }),
  codeblocks: many(CodeBlock),
  sections: many(Section),
}));
