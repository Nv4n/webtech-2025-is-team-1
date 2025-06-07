import { UserSchema } from "@/features/Profile/types/Profile";
import { string, z } from "zod";

export const LoginSchema = UserSchema.pick({
	username: true,
	password: true,
});

export type LoginUser = z.infer<typeof LoginSchema>;

export const RegisterSchemaPure = UserSchema.omit({
	id: true,
	createdAt: true,
	role: true,
});

export const RegisterSchema = RegisterSchemaPure.extend({
	rePassword: UserSchema.shape.password,
}).refine((data) => data.password === data.rePassword, {
	message: "Passwords do not match",
	path: ["rePassword"],
});

export type RegisterUser = z.infer<typeof RegisterSchema>;

export const AuthResponseSchema = z.object({
	email: z.string().email(),
	expiration: z.string(),
	role: z.string(),
	success: z.boolean(),
	token: z.string(),
	username: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
