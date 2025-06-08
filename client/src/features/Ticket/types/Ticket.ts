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

export const TicketPriorities = ["Low", "Medium", "High", "Critical"] as const;

export const TicketSchema = z.object({
	id: z.coerce
		.string()
		.optional()
		.or(z.number().transform((num) => num.toString())), // set to optional to skip mandatory check
	title: z.string().min(3).max(200),
	status: z.enum(TicketStatuses),
	priority: z.enum(TicketPriorities),
	description: z.string().min(10),
	assigneeId: z.coerce
		.string()
		.or(z.number().transform((num) => num.toString())),
	projectId: z.coerce
		.string()
		.or(z.number().transform((num) => num.toString())),
	authorId: z.coerce.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	updatedBy: z.coerce
		.string()
		.optional()
		.or(z.number().transform((num) => num.toString())),
});

export type Ticket = z.infer<typeof TicketSchema>;
