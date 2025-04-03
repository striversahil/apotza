ALTER TABLE "component" RENAME COLUMN "payload" TO "content";--> statement-breakpoint
ALTER TABLE "component" RENAME COLUMN "configuration" TO "appearence";--> statement-breakpoint
ALTER TABLE "section" ALTER COLUMN "layout" SET DEFAULT '{"width":200,"height":200}'::jsonb;--> statement-breakpoint
ALTER TABLE "section" ALTER COLUMN "layout" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "component" ADD COLUMN "interaction" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "section" ADD COLUMN "content" jsonb DEFAULT '{}'::jsonb NOT NULL;