// [FromQuery] int[]? projectIds,
// [FromQuery] int[]? assigneeIds,
// [FromQuery] int[]? authorIds,
// [FromQuery] TicketStatus[]? statuses,
// [FromQuery] Priority[]? priorities,
// [FromQuery] IssueType[]? issueTypes)

import { TicketStatuses } from "@/features/Ticket/types/Ticket";
import { z } from "zod";

export const TicketFilterSchema = z.object({
	projectId: z.array(z.number()).optional(),
	assigneeIds: z.array(z.number()).optional(),
	statuses: z.array(z.enum(TicketStatuses)).optional(),
});

export type TicketFilter = z.infer<typeof TicketFilterSchema>;
