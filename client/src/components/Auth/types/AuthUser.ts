import { UserSchema } from "@/components/Profile/types/Profile";
import { z } from "zod";

export const LoginSchema = UserSchema.omit({
	id: true,
	createdAt: true,
	role: true,
	fname: true,
	lname: true,
	email: true,
});

export type LoginUser = z.infer<typeof LoginSchema>;

export const RegisterSchema = UserSchema.omit({
	id: true,
	createdAt: true,
	role: true,
})
	.extend({
		rePassword: UserSchema.shape.password,
	})
	.refine((data) => data.password === data.rePassword, {
		message: "Passwords do not match",
		path: ["rePassword"],
	});

export type RegisterUser = z.infer<typeof RegisterSchema>;
