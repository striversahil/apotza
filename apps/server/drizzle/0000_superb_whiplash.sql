CREATE TABLE "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" serial NOT NULL,
	"name" text NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL,
	CONSTRAINT "project_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"name" text NOT NULL,
	"private" boolean DEFAULT false NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL,
	CONSTRAINT "workspace_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"profile_pic" varchar(256) NOT NULL,
	"bio" text,
	"location" text,
	"socials" jsonb,
	"email" varchar(256) NOT NULL,
	CONSTRAINT "user_profile_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(256) NOT NULL,
	"refresh_token" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL,
	CONSTRAINT "user_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;