import { ProjectSchema } from "@/features/Project/types/Project";
import { TicketSchema } from "@/features/Ticket/types/Ticket";
import { z } from "zod";

export const WorkflowSchema = z.object({
	id: z.coerce.string().optional(),
	project: ProjectSchema.shape.id,
	fromStatus: TicketSchema.shape.status,
	toStatus: TicketSchema.shape.status,
});

export type Workflow = z.infer<typeof WorkflowSchema>;
