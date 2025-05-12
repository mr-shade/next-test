CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
DROP TABLE `users`;