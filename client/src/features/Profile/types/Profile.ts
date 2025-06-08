import { z } from "zod";

export const UserSchema = z.object({
	id: z.coerce.string().optional(),
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	username: z.string().min(3),
	password: z.string().min(8).max(32),
	createdAt: z.string(),
	email: z.string().email().max(100),
	role: z.string().min(3).max(20),
});

export const FetchingUserSchema = UserSchema.omit({ password: true });

export type User = z.infer<typeof UserSchema>;

export const ProfileSchema = UserSchema.pick({
	id: true,
	firstName: true,
	lastName: true,
	username: true,
	email: true,
	// role: true,
});
export type Profile = z.infer<typeof ProfileSchema>;
