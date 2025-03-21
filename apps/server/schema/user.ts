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
} from "drizzle-orm/pg-core";
import { Project } from "./project";

// +++++++++++++++++++++++++++++++++++++++++++++++++ Tables +++++++++++++++++++++++++++++++++++++++++++++++++

export const User = pgTable("user", {
  id: serial("id").primaryKey().unique(),
  name: text("name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type UserType = InferSelectModel<typeof User>;

export const Profile = pgTable("user_profile", {
  id: serial("id").primaryKey().unique(),
  user: serial("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
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

export const Workspace = pgTable("workspace", {
  id: serial("id").primaryKey().unique(),
  user: serial("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  private: boolean("private").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type WorkspaceType = InferSelectModel<typeof Workspace>;

// ++++++++++++++++++++++++++++++++++++++++++++++ Relations ++++++++++++++++++++++++++++++++++++++++++++++

export const userProfileRelation = relations(Profile, ({ one }) => ({
  user: one(User, {
    fields: [Profile.user],
    references: [User.id],
  }),
}));

export const workspaceRelation = relations(Workspace, ({ one, many }) => ({
  user: one(User, {
    fields: [Workspace.user],
    references: [User.id],
  }),
  projects: many(Project),
}));

export const userRelation = relations(User, ({ many }) => ({
  workspaces: many(Workspace),
  profile: many(Profile),
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
