ALTER TABLE "stepblock" ADD COLUMN "project_id" uuid;--> statement-breakpoint
ALTER TABLE "component" ADD COLUMN "project_id" uuid;--> statement-breakpoint
ALTER TABLE "section" ADD COLUMN "project_id" uuid;--> statement-breakpoint
ALTER TABLE "stepblock" ADD CONSTRAINT "stepblock_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "component" ADD CONSTRAINT "component_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE cascade;