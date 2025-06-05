import { ProjectIdSchema } from "@/features/Project/types/Project";
import { TicketSchema } from "@/features/Ticket/types/Ticket";
import { z } from "zod";

export const WorkflowIdSchema = z.coerce.string();

export const WorkflowSchema = z.object({
	id: WorkflowIdSchema.optional(),
	project: ProjectIdSchema,
	fromStatus: TicketSchema.shape.status,
	toStatus: TicketSchema.shape.status,
});

export type Workflow = z.infer<typeof WorkflowSchema>;


