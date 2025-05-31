ALTER TABLE "codeblock" ADD COLUMN "referenced_context" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "global_context" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "codeblock" DROP COLUMN "stepblock_context";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "component_context";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "codeblock_context";