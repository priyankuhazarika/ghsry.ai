CREATE TABLE `users` (
	`id` varchar(35) NOT NULL,
	`name` varchar(256) NOT NULL,
	`createdAt` datetime,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
