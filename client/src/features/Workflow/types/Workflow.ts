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

export const NodeSchema = z.object({
	id: z.string(),
	type: z.string(),
	position: z.object({ x: z.number(), y: z.number() }),
	data: z.object({ label: z.string() }),
});

export type ZodNode = z.infer<typeof NodeSchema>;

export const EdgeSchema = z.object({
	id: z.string(),
	source: z.string(),
	target: z.string(),
	label: z.string().optional(),
	sourceHandle: z.string().nullable().optional(),
	targetHandle: z.string().nullable().optional(),
});

export type ZodEdge = z.infer<typeof EdgeSchema>;
