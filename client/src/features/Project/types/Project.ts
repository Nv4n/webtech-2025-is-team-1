import { z } from "zod";

export const ProjectSchema = z.object({
	id: z.coerce.string().optional(),
	name: z.string().min(3).max(100),
	description: z.string().min(10),
	createdAt: z.string(),
	workflowId: z.coerce.string(),
	ownerId: z.coerce.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectEditSchema = ProjectSchema.pick({
	id: true,
	name: true,
	description: true,
});

export type ProjectEdit = z.infer<typeof ProjectEditSchema>;

export const ProjectCreateSchema = ProjectEditSchema.extend({
	// worflow: WorkflowSchema.pick({ fromStatus: true, toStatus: true }),
});

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
