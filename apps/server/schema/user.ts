import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  json,
  jsonb,
} from "drizzle-orm/pg-core";
import { Project } from "./project";

// +++++++++++++++++++++++++++++++++++++++++++++++++ Tables +++++++++++++++++++++++++++++++++++++++++++++++++

export const users = pgTable("user", {
  id: serial("id").primaryKey().unique(),
  name: text("name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: text("created_at").notNull().default("now()"),
});

export const userProfile = pgTable("user_profile", {
  id: serial("id").primaryKey().unique(),
  user: serial("user")
    .notNull()
    .references(() => users.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  profilePic: varchar("profile_pic", { length: 256 }).notNull(),
  bio: text("bio"),
  location: text("location"),
  socials: jsonb("socials"),
  email: varchar("email", { length: 256 }).notNull(),
});

export const Workspace = pgTable("workspace", {
  id: serial("id").primaryKey().unique(),
  user: serial("user")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  private: boolean("private").notNull().default(false),
  createdAt: text("created_at").notNull().default("now()"),
});

// ++++++++++++++++++++++++++++++++++++++++++++++ Relations ++++++++++++++++++++++++++++++++++++++++++++++

export const userProfileRelation = relations(userProfile, ({ one }) => ({
  user: one(users, {
    fields: [userProfile.user],
    references: [users.id],
  }),
}));

export const workspaceRelation = relations(Workspace, ({ one, many }) => ({
  user: one(users, {
    fields: [Workspace.user],
    references: [users.id],
  }),
  projects: many(Project),
}));

export const userRelation = relations(users, ({ many }) => ({
  workspaces: many(Workspace),
  profile: many(userProfile),
}));
