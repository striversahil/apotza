CREATE TABLE "codeblock" (
	"id" serial PRIMARY KEY NOT NULL,
	"project" serial NOT NULL,
	"name" text NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL,
	CONSTRAINT "codeblock_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "component" (
	"id" serial PRIMARY KEY NOT NULL,
	"section" serial NOT NULL,
	"name" text NOT NULL,
	"coordinates" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"configuration" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL,
	CONSTRAINT "component_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "section" (
	"id" serial PRIMARY KEY NOT NULL,
	"project" serial NOT NULL,
	"name" text NOT NULL,
	"layout" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"appearence" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL,
	CONSTRAINT "section_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "stepblock" (
	"id" serial PRIMARY KEY NOT NULL,
	"codeblock" serial NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"language" text NOT NULL,
	"output" text NOT NULL,
	"stdout" text NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL,
	CONSTRAINT "stepblock_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_workspace_id_workspace_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "workspace" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "details" text DEFAULT 'Some details about this project' NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace" ADD COLUMN "user" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "user" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "codeblock" ADD CONSTRAINT "codeblock_project_project_id_fk" FOREIGN KEY ("project") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "component" ADD CONSTRAINT "component_section_section_id_fk" FOREIGN KEY ("section") REFERENCES "public"."section"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_project_project_id_fk" FOREIGN KEY ("project") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stepblock" ADD CONSTRAINT "stepblock_codeblock_codeblock_id_fk" FOREIGN KEY ("codeblock") REFERENCES "public"."codeblock"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "workspace_id";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "codeBlock";--> statement-breakpoint
ALTER TABLE "workspace" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "user_profile" DROP COLUMN "user_id";