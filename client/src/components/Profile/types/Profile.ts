import { z } from "zod";

export const UserSchema = z.object({
	id: z.string().uuid(),
	fname: z.string().min(3),
	lname: z.string().min(3),
	username: z.string().min(3),
	password: z.string().min(8).max(32),
});
export type User = z.infer<typeof UserSchema>;

export const ProfileSchema = UserSchema.pick({
	fname: true,
	lname: true,
	username: true,
});

export type Profile = z.infer<typeof ProfileSchema>;
