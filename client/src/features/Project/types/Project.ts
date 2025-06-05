import { UserIdSchema } from "@/features/Profile/types/Profile";
import { WorkflowIdSchema } from "@/features/Workflow/types/Workflow";
import { z } from "zod";

export const ProjectIdSchema = z.coerce.string();

export const ProjectSchema = z.object({
	id: ProjectIdSchema.optional(),
	name: z.string().min(3).max(100),
	description: z.string().min(10),
	createdAt: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
	workflowId: WorkflowIdSchema,
	ownerId: UserIdSchema,
});

export type Project = z.infer<typeof ProjectSchema>;

const ProjectEditSchema = ProjectSchema.pick({ name: true, createdAt: true });

export type ProjectEdit = z.infer<typeof ProjectEditSchema>;

const ProjectCreateSchema = ProjectEditSchema.extend({
	// worflow: WorkflowSchema.pick({ fromStatus: true, toStatus: true }),
});

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
