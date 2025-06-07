import { TicketSchema } from "@/features/Ticket/types/Ticket";
import { z } from "zod";

export const WorkflowSchema = z.object({
	id: z.coerce.string().optional(),
	project: z.coerce.string(),
	fromStatus: z.coerce.string(),
	toStatus: TicketSchema.shape.status,
});

export type Workflow = z.infer<typeof WorkflowSchema>;
