import { number, z } from "zod";

export const TicketStatuses = [
	"Open",
	"InProgress",
	"InReview",
	"Testing",
	"Done",
	"Closed",
	"Blocked",
	"Cancelled",
];

export const TicketPriorities = ["Low", "Medium", "High", "Critical"];

export const TicketSchema = z.object({
	id: z.coerce.string().optional(), // set to optional to skip mandatory check
	title: z.string().min(3).max(200),
	status: z.number(),
	priority: z.number(),
	description: z.string().min(10),
	assignee: z.coerce.string(),
	project: z.coerce.string(),
	author: z.coerce.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	updatedBy: z.coerce.string(),
});

export type Ticket = z.infer<typeof TicketSchema>;
