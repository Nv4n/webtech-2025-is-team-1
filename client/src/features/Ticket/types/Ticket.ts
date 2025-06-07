import { z } from "zod";

export const TicketStatuses = [
	"Open",
	"InProgress",
	"InReview",
	"Testing",
	"Done",
	"Closed",
	"Blocked",
	"Cancelled",
] as const;
export const TicketPriorities = ["Low", "Medium", "High"] as const;

export const TicketSchema = z.object({
	id: z.coerce.string().optional(), // set to optional to skip mandatory check
	title: z.string().min(3).max(200),
	status: z.enum(TicketStatuses),
	priority: z.enum(TicketPriorities),
	description: z.string().min(10),
	assignee: z.coerce.string(),
	project: z.coerce.string(),
	author: z.coerce.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	updatedBy: z.coerce.string(),
});

export type Ticket = z.infer<typeof TicketSchema>;
