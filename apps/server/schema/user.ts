import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  json,
  jsonb,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { Page } from "./component";
import { CodeBlock } from "./codeblock";

// +++++++++++++++++++++++++++++++++++++++++++++++++ User Identity Table +++++++++++++++++++++++++++++++++++++++++++++++++

export const User = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type UserType = InferSelectModel<typeof User>;

export const Profile = pgTable("user_profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  user: uuid("user_id").references(() => User.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  profilePic: varchar("profile_pic", { length: 256 }).notNull(),
  bio: text("bio"),
  location: text("location"),
  socials: jsonb("socials"),
  email: varchar("email", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type ProfileType = InferSelectModel<typeof Profile>;

// +++++++++++++++++++++++++++++++++++++++++++++++++ Workspace and Project Tables +++++++++++++++++++++++++++++++++++++++++++++++++

export const Workspace = pgTable("workspace", {
  id: uuid("id").defaultRandom().primaryKey(),
  user: uuid("user_id").references(() => User.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  name: text("name").notNull(),
  private: boolean("private").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type WorkspaceType = InferSelectModel<typeof Workspace>;

export const Project = pgTable("project", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspace: uuid("workspace_id").references(() => Workspace.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  name: text("name").notNull(),
  details: text("details").notNull().default("Some details about this project"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type ProjectInterface = InferSelectModel<typeof Project>;
// ++++++++++++++++++++++++++++++++++++++++++++++ Relations ++++++++++++++++++++++++++++++++++++++++++++++

export const userProfileRelation = relations(Profile, ({ one }) => ({
  user: one(User, {
    fields: [Profile.user],
    references: [User.id],
  }),
}));

export const userRelation = relations(User, ({ many }) => ({
  workspaces: many(Workspace),
  profile: many(Profile),
}));

export const workspaceRelation = relations(Workspace, ({ one, many }) => ({
  user: one(User, {
    fields: [Workspace.user],
    references: [User.id],
  }),
  projects: many(Project),
}));

export const projectRelations = relations(Project, ({ one, many }) => ({
  workspace: one(Workspace, {
    fields: [Project.workspace],
    references: [Workspace.id],
  }),
  codeblocks: many(CodeBlock),
  pages: many(Page),
}));

// const workspaceWithRelations = await db
//   .select()
//   .from(Workspace)
//   .leftJoin(users, workspaceRelation.user)
//   .leftJoin(Project, workspaceRelation.projects);

// Spit's Output like this
// [
//   {
//     "id": 1,
//     "name": "Workspace A",
//     "user": {
//       "id": 101,
//       "name": "User One"
//     },
//     "projects": [
//       {
//         "id": 201,
//         "name": "Project X"
//       },
//       {
//         "id": 202,
//         "name": "Project Y"
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "name": "Workspace B",
//     "user": {
//       "id": 102,
//       "name": "User Two"
//     },
//     "projects": [
//       {
//         "id": 203,
//         "name": "Project Z"
//       }
//     ]
//   }
// ]
