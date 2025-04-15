ALTER TABLE "component" ADD COLUMN "page_id" uuid;--> statement-breakpoint
ALTER TABLE "page" DROP COLUMN "component_id";