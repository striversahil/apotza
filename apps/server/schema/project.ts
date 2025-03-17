import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { Workspace } from "./user";
import { relations } from "drizzle-orm";

export const Project = pgTable("project", {
  id: serial("id").primaryKey().unique(),
  workspace: serial("workspace")
    .notNull()
    .references(() => Workspace.id),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull().default("now()"),
});

// +++++++++++++++++++++++++++++++++++++++++++++++++ Components Tables +++++++++++++++++++++++++++++++++++++++++++++++++

export const Section = pgTable("section", {
  id: serial("id").primaryKey().unique(),
  project: serial("project")
    .notNull()
    .references(() => Project.id),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull().default("now()"),
});

export const Component = pgTable("component", {
  id: serial("id").primaryKey().unique(),
  section: serial("section")
    .notNull()
    .references(() => Section.id),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull().default("now()"),
});

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
  project: serial("project")
    .notNull()
    .references(() => Project.id),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull().default("now()"),
});

export const StepBlock = pgTable("stepblock", {
  id: serial("id").primaryKey().unique(),
  codeblock: serial("codeblock")
    .notNull()
    .references(() => CodeBlock.id),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull().default("now()"),
});

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
  codeBlocks: many(CodeBlock),
  sections: many(Section),
}));
