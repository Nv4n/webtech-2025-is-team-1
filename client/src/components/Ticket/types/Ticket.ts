import { UserSchema } from "@/components/Profile/types/Profile";
import { ProjectSchema } from "@/components/Project/types/Project";
import { z } from "zod";

export const TicketSchema = z.object({
	id: z.string().optional(), // set to optional to skip mandatory check
	title: z.string().min(3),
	status: z.enum(["not-started", "in-progress", "completed"]),
	description: z.string().min(10),
	asignedTo: UserSchema.shape.id,
	createdAt: z.date(),
	updatedAt: z.date(),
	updatedBy: UserSchema.pick({ id: true }).required().shape.id,
	project: ProjectSchema.pick({ id: true }).required().shape.id,
});

export type Ticket = z.infer<typeof TicketSchema>;
