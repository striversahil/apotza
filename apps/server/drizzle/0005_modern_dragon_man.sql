ALTER TABLE "component" ADD COLUMN "type" text DEFAULT 'component';--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "type" text DEFAULT 'page';--> statement-breakpoint
ALTER TABLE "section" ADD COLUMN "type" text DEFAULT 'section';