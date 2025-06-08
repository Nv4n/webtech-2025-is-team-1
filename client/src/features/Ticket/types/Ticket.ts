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
	id: z.coerce.string().optional(), // set to optional to skip mandatory check
	title: z.string().min(3).max(200),
	status: z.enum(TicketStatuses),
	priority: z.enum(TicketPriorities),
	description: z.string().min(10),
	assigneeId: z.coerce.string(),
	projectId: z.coerce.string(),
	authorId: z.coerce.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	updatedBy: z.coerce.string().optional(),
});

export type Ticket = z.infer<typeof TicketSchema>;

export const ChangeTicketSchema = TicketSchema.omit({
	updatedBy: true,
	authorId: true,
	projectId: true,
	assigneeId: true,
	id: true,
}).extend({
	id: z
		.string()
		.transform((str) => Number(str))
		.optional(),
	authorId: z.string().transform((str) => Number(str)),
	projectId: z.string().transform((str) => Number(str)),
	assigneeId: z.string().transform((str) => Number(str)),
	updatedBy: z
		.string()
		.transform((str) => Number(str))
		.optional(),
});
