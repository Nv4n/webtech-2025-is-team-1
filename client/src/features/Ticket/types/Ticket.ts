import { number, z } from "zod";

export const TicketStatuses = {
	1: "Open",
	2: "InProgress",
	3: "InReview",
	4: "Testing",
	5: "Done",
	6: "Closed",
	7: "Blocked",
	8: "Cancelled",
} as const;

export const TicketPriorities = {
	1: "Low",
	2: "Medium",
	3: "High",
	4: "Critical",
} as const;

export const TicketSchema = z.object({
	id: z.coerce.string().optional(), // set to optional to skip mandatory check
	title: z.string().min(3).max(200),
	status: z.number(),
	priority: z.number(),
	description: z.string().min(10),
	assignee: z.coerce.string(),
	project: z.coerce.string(),
	author: z.coerce.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	updatedBy: z.coerce.string(),
});

export type Ticket = z.infer<typeof TicketSchema>;
