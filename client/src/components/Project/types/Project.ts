import { z } from "zod";

export const ProjectSchema = z.object({
	id: z.coerce.string().optional(),
	name: z.string().min(3).max(100),
	description: z.string().min(10),
	createdAt: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
});

const ProjectWithoutCA = ProjectSchema.omit({ createdAt: true });

export type Project = z.infer<typeof ProjectWithoutCA>;
