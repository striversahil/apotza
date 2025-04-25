ALTER TABLE "stepblock" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stepblock" ADD COLUMN "config" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "stepblock" ADD COLUMN "request" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stepblock" DROP COLUMN "code";--> statement-breakpoint
ALTER TABLE "stepblock" DROP COLUMN "language";