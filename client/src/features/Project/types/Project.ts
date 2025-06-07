import { z } from "zod";

export const ProjectSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3).max(100),
	description: z.string().min(10),
	createdAt: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
	workflowId: z.coerce.string(),
	ownerId: z.coerce.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectEditSchema = ProjectSchema.pick({
	name: true,
	description: true,
});

export type ProjectEdit = z.infer<typeof ProjectEditSchema>;

export const ProjectCreateSchema = ProjectEditSchema.extend({
	// worflow: WorkflowSchema.pick({ fromStatus: true, toStatus: true }),
});

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
