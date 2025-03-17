CREATE TABLE "usersWithId" (
	"id" serial NOT NULL,
	"full_name" text,
	"phone" varchar(256),
	"home" varchar(256),
	"highschool" boolean DEFAULT true NOT NULL,
	"email" varchar(256) DEFAULT 'striversahil@gmail.com' NOT NULL,
	"json" jsonb DEFAULT '{"sahil":"Admin","name":"Sahil"}'::jsonb NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "usersWithId" ADD CONSTRAINT "usersWithId_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;