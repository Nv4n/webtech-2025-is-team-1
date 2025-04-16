import { z } from "zod";



export const TicketSchema = z.object({
	title: z.string().min(3),
	description: z.string().min(10),
});

export type Ticket = z.infer<typeof TicketSchema>;
