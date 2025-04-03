CREATE TABLE "page" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid,
	"component_id" uuid,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "codeblock" DROP CONSTRAINT "codeblock_project_id_project_id_fk";
--> statement-breakpoint
ALTER TABLE "component" DROP CONSTRAINT "component_section_id_section_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_workspace_id_workspace_id_fk";
--> statement-breakpoint
ALTER TABLE "section" DROP CONSTRAINT "section_project_id_project_id_fk";
--> statement-breakpoint
ALTER TABLE "stepblock" DROP CONSTRAINT "stepblock_codeblock_id_codeblock_id_fk";
--> statement-breakpoint
ALTER TABLE "section" ADD COLUMN "component_id" uuid;