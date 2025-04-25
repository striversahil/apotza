CREATE TABLE "codeblock" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stepblock" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"codeblock_id" uuid,
	"config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"output" text NOT NULL,
	"stdout" text NOT NULL,
	"request" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "component" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'component',
	"page_id" uuid,
	"section_id" uuid,
	"name" text NOT NULL,
	"coordinates" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"content" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"layout" jsonb DEFAULT '{"width":200,"height":200}'::jsonb,
	"appearance" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"interaction" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "page" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'page',
	"project_id" uuid,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "section" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'section',
	"component_id" uuid,
	"page_id" uuid,
	"name" text NOT NULL,
	"content" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"layout" jsonb DEFAULT '{"width":200,"height":200}'::jsonb,
	"appearance" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"first_name" text NOT NULL,
	"last_name" text,
	"profile_pic" varchar(256) NOT NULL,
	"bio" text,
	"location" text,
	"socials" jsonb,
	"email" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid,
	"name" text NOT NULL,
	"details" text DEFAULT 'Some details about this project' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" varchar(256) NOT NULL,
	"refresh_token" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"private" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "codeblock" ADD CONSTRAINT "codeblock_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "stepblock" ADD CONSTRAINT "stepblock_codeblock_id_codeblock_id_fk" FOREIGN KEY ("codeblock_id") REFERENCES "public"."codeblock"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "component" ADD CONSTRAINT "component_section_id_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."section"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "page" ADD CONSTRAINT "page_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;