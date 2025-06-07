import { UserSchema } from "@/features/Profile/types/Profile";
import { IdSchema } from "@/types/ZodId";
import { z } from "zod";

export const UserIdSchema = IdSchema;

export type User = z.infer<typeof UserSchema>;

export const ProfileSchema = UserSchema.pick({
	id: true,
	firstName: true,
	lastName: true,
	username: true,
	email: true,
	password: true,
	role: true,
	createdAt: true,
});
export type FullProfile = z.infer<typeof ProfileSchema>;
