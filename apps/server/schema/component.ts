import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { Project, Workspace } from "./user";
import { InferSelectModel, relations } from "drizzle-orm";

// +++++++++++++++++++++++++++++++++++++++++++++++++ Components Tables +++++++++++++++++++++++++++++++++++++++++++++++++
export type PageInterface = InferSelectModel<typeof Page>;
export type SectionInterface = InferSelectModel<typeof Section>;
export type ComponentInterface = InferSelectModel<typeof Component>;

export const Page = pgTable("page", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").default("page"),
  project: uuid("project_id").references(() => Project.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const Section = pgTable("section", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").default("section"),
  component_id: uuid("component_id"),
  page: uuid("page_id").references(() => Page.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  name: text("name").notNull(),
  content: jsonb("content").notNull().default({}), // Contains the component data
  layout: jsonb("layout").default({ width: 200, height: 200 }),
  appearance: jsonb("appearance").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const Component = pgTable("component", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").default("component"),
  page: uuid("page_id"),
  section: uuid("section_id").references(() => Section.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
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
  // Section can be Called from Page and Component as Well
  page: one(Page, {
    fields: [Section.page],
    references: [Page.id],
  }),
  component: one(Component, {
    fields: [Section.component_id],
    references: [Component.id],
  }),
  components: many(Component),
}));

export const componentRelations = relations(Component, ({ one, many }) => ({
  // Component can be Called from Page and Section as Well
  section: one(Section, {
    fields: [Component.section],
    references: [Section.id],
  }),
  page: one(Page, {
    fields: [Component.page],
    references: [Page.id],
  }),
}));
