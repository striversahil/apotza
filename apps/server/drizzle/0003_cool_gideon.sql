ALTER TABLE "codeblock" DROP CONSTRAINT "codeblock_project_project_id_fk";
--> statement-breakpoint
ALTER TABLE "component" DROP CONSTRAINT "component_section_section_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_workspace_workspace_id_fk";
--> statement-breakpoint
ALTER TABLE "section" DROP CONSTRAINT "section_project_project_id_fk";
--> statement-breakpoint
ALTER TABLE "stepblock" DROP CONSTRAINT "stepblock_codeblock_codeblock_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "codeblock" ADD CONSTRAINT "codeblock_project_project_id_fk" FOREIGN KEY ("project") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "component" ADD CONSTRAINT "component_section_section_id_fk" FOREIGN KEY ("section") REFERENCES "public"."section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_workspace_workspace_id_fk" FOREIGN KEY ("workspace") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_project_project_id_fk" FOREIGN KEY ("project") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stepblock" ADD CONSTRAINT "stepblock_codeblock_codeblock_id_fk" FOREIGN KEY ("codeblock") REFERENCES "public"."codeblock"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;