ALTER TABLE "component" ALTER COLUMN "component" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "codeblock" ADD COLUMN "output" jsonb;--> statement-breakpoint
ALTER TABLE "codeblock" ADD COLUMN "error" jsonb;