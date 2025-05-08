ALTER TABLE "codeblock" ADD COLUMN "order_no" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "stepblock" ADD COLUMN "order_no" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "component" ADD COLUMN "order_no" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "order_no" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "section" ADD COLUMN "order_no" serial NOT NULL;