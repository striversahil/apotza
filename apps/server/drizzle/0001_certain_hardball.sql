ALTER TABLE "codeblock" DROP CONSTRAINT "codeblock_id_unique";--> statement-breakpoint
ALTER TABLE "stepblock" DROP CONSTRAINT "stepblock_id_unique";--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "private" SET DEFAULT true;