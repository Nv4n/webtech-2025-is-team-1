import { UserSchema } from "@/components/Profile/types/Profile";
import { z } from "zod";

export const TicketSchema = z.object({
	title: z.string().min(3),
	status: z.string().min(3),
	description: z.string().min(10),
	asignees: z.array(UserSchema.shape.id),
	createdAt: z.date(),
	updatedAt: z.date(),
	updatedBy: UserSchema.shape.id,
	project: z.string().min(3) // in future this will be connected with the project schema
});

export type Ticket = z.infer<typeof TicketSchema>;