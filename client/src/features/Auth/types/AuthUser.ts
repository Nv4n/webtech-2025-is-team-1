import { UserSchema } from "@/features/Profile/types/Profile";
import { z } from "zod";

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
