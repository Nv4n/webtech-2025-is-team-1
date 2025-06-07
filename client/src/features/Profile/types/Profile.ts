import { z } from "zod";

export const UserSchema = z.object({
	id: z.coerce.string().optional(),
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	username: z.string().min(3),
	password: z.string().min(8).max(32),
	createdAt: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
	email: z.string().email().max(100),
	role: z.string().min(3).max(20),
});

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
