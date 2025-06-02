import { UserSchema } from "@/features/Profile/types/Profile";
import { ProjectSchema } from "@/features/Project/types/Project";
import { z } from "zod";

export const TicketSchema = z.object({
	id: z.coerce.string().optional(), // set to optional to skip mandatory check
	title: z.string().min(3).max(200),
	status: z.enum(["not-started", "in-progress", "completed"]),
	priority: z.enum(["Low", "Medium", "High"]),
	description: z.string().min(10),
	assignee: UserSchema.shape.id,
	project: ProjectSchema.pick({ id: true }).required().shape.id,
	author: UserSchema.shape.id,
	createdAt: z.date(),
	updatedAt: z.date(),
	updatedBy: UserSchema.pick({ id: true }).required().shape.id,
});

export type Ticket = z.infer<typeof TicketSchema>;
