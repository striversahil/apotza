import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { Workspace } from "./user";
import { InferSelectModel, relations } from "drizzle-orm";

export type ProjectInterface = InferSelectModel<typeof Project>;
export const Project = pgTable("project", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspace: uuid("workspace_id"),
  name: text("name").notNull(),
  details: text("details").notNull().default("Some details about this project"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// +++++++++++++++++++++++++++++++++++++++++++++++++ Components Tables +++++++++++++++++++++++++++++++++++++++++++++++++
export type PageInterface = InferSelectModel<typeof Page>;
export type SectionInterface = InferSelectModel<typeof Section>;
export type ComponentInterface = InferSelectModel<typeof Component>;

export const Page = pgTable("page", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").default("page"),
  project: uuid("project_id"),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const Section = pgTable("section", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").default("section"),
  page: uuid("page_id"),
  name: text("name").notNull(),
  content: jsonb("content").notNull().default({}), // Contains the component data
  layout: jsonb("layout").default({ width: 200, height: 200 }),
  appearance: jsonb("appearance").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const Component = pgTable("component", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").default("component"),
  section: uuid("section_id"),
  name: text("name").notNull(),
  coordinates: jsonb("coordinates").notNull().default({}),
  content: jsonb("content").notNull().default({}), // Contains the component data
  layout: jsonb("layout").default({ width: 200, height: 200 }),
  appearance: jsonb("appearance").notNull().default({}),
  interaction: jsonb("interaction").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const pageRelations = relations(Page, ({ one, many }) => ({
  project: one(Project, {
    fields: [Page.project],
    references: [Project.id],
  }),
  sections: many(Section),
}));

export const sectionRelations = relations(Section, ({ one, many }) => ({
  page: one(Page, {
    fields: [Section.page],
    references: [Page.id],
  }),
  components: many(Component),
}));

export const componentRelations = relations(Component, ({ one, many }) => ({
  section: one(Section, {
    fields: [Component.section],
    references: [Section.id],
  }),
}));

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
  codeblock: uuid("codeblock_id"),
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
  pages: many(Page),
}));
