// [FromQuery] int[]? projectIds,
// [FromQuery] int[]? assigneeIds,
// [FromQuery] int[]? authorIds,
// [FromQuery] TicketStatus[]? statuses,
// [FromQuery] Priority[]? priorities,
// [FromQuery] IssueType[]? issueTypes)

import { TicketStatuses } from "@/features/Ticket/types/Ticket";
import { z } from "zod";

const optionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional(),
});

export const TicketFilterSchema = z.object({
	projectIds: z.array(z.number()).optional(),
	assigneeIds: z.array(z.number()).optional(),
	statuses: z.array(z.enum(TicketStatuses)).optional(),
});

export type TicketFilter = z.infer<typeof TicketFilterSchema>;

export const TicketFilterFormSchema = z.object({
	projectIds: z.array(optionSchema),
	assigneeIds: z.array(optionSchema),
	statuses: z.array(optionSchema),
});

export type TicketFilterForm = z.infer<typeof TicketFilterFormSchema>;

export const TicketTransformSchema = z.object({
	statuses: z
		.array(optionSchema)
		.transform((opts) => {
			console.log(opts);

			return opts.map((opt) => opt.value);
		})
		.optional(),
	assigneeIds: z
		.array(optionSchema)
		.transform((opts) => {
			return opts.map((opt) => Number(opt.value));
		})
		.optional(),
	projectIds: z
		.array(optionSchema)
		.transform((opts) => {
			return opts.map((opt) => Number(opt.value));
		})
		.optional(),
});
