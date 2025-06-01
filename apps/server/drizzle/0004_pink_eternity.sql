ALTER TABLE "stepblock" RENAME COLUMN "config" TO "configuration";--> statement-breakpoint
ALTER TABLE "codeblock" ADD COLUMN "configuration" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "component" ADD COLUMN "configuration" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "configuration" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "section" ADD COLUMN "configuration" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "component" DROP COLUMN "content";--> statement-breakpoint
ALTER TABLE "component" DROP COLUMN "layout";--> statement-breakpoint
ALTER TABLE "component" DROP COLUMN "appearance";--> statement-breakpoint
ALTER TABLE "section" DROP COLUMN "content";--> statement-breakpoint
ALTER TABLE "section" DROP COLUMN "layout";--> statement-breakpoint
ALTER TABLE "section" DROP COLUMN "appearance";