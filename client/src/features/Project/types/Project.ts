import { UserSchema } from "@/features/Profile/types/Profile";
import { z } from "zod";

export const ProjectSchema = z.object({
	id: z.coerce.string().optional(),
	name: z.string().min(3).max(100),
	description: z.string().min(10),
	createdAt: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
	// workflowId: WorkflowSchema.shape.id,
	ownerId: UserSchema.shape.id,
});

export type Project = z.infer<typeof ProjectSchema>;

const ProjectEditSchema = ProjectSchema.pick({ name: true, createdAt: true });

export type ProjectEdit = z.infer<typeof ProjectEditSchema>;

const ProjectCreateSchema = ProjectEditSchema.extend({
	// worflow: WorkflowSchema.pick({ fromStatus: true, toStatus: true }),
});

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
