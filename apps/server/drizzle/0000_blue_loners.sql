CREATE TABLE "codeblock" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" serial NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "codeblock_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "component" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" serial NOT NULL,
	"name" text NOT NULL,
	"coordinates" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"configuration" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" serial NOT NULL,
	"name" text NOT NULL,
	"details" text DEFAULT 'Some details about this project' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "section" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" serial NOT NULL,
	"name" text NOT NULL,
	"layout" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"appearence" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stepblock" (
	"id" serial PRIMARY KEY NOT NULL,
	"codeblock_id" serial NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"language" text NOT NULL,
	"output" text NOT NULL,
	"stdout" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "stepblock_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"name" text NOT NULL,
	"private" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
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
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_profile_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(256) NOT NULL,
	"refresh_token" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "codeblock" ADD CONSTRAINT "codeblock_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "component" ADD CONSTRAINT "component_section_id_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stepblock" ADD CONSTRAINT "stepblock_codeblock_id_codeblock_id_fk" FOREIGN KEY ("codeblock_id") REFERENCES "public"."codeblock"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;