import { UserSchema } from "@/components/Profile/types/Profile";
import { ProjectSchema } from "@/components/Project/types/Project";
import { z } from "zod";

export const TicketSchema = z.object({
	id: z.string().optional(), // set to optional to skip mandatory check
	title: z.string().min(3),
	status: z.string().min(3),
	description: z.string().min(10),
	asignedTo: UserSchema.shape.id,
	createdAt: z.date(),
	updatedAt: z.date(),
	updatedBy: UserSchema.shape.id,
	project: ProjectSchema.shape.id,
});

export type Ticket = z.infer<typeof TicketSchema>;
