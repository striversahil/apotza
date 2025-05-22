ALTER TABLE "codeblock" ADD COLUMN "stepblock_context" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "component_context" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "codeblock_context" jsonb DEFAULT '{}'::jsonb NOT NULL;