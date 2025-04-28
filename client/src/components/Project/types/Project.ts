import { z } from "zod";

export const ProjectSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
});

export type Project = z.infer<typeof ProjectSchema>;
