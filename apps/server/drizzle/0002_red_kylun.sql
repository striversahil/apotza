ALTER TABLE "stepblock" ADD COLUMN "referenced_context" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "component" ADD COLUMN "referenced_context" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "referenced_context" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "section" ADD COLUMN "referenced_context" jsonb DEFAULT '[]'::jsonb NOT NULL;