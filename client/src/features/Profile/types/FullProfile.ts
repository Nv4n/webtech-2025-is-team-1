import { IdSchema } from "@/types/ZodId";
import { z } from "zod";

export const UserIdSchema = IdSchema;

export const UserSchema = z.object({
    id: UserIdSchema.optional(),
    fname: z.string().min(3),
    lname: z.string().min(3),
    username: z.string().min(3),
    password: z.string().min(8).max(32),
    createdAt: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
    email: z.string().email().max(100),
    role: z.string().min(3).max(20),
});

export type User = z.infer<typeof UserSchema>;

export const ProfileSchema = UserSchema.pick({
    id: true,
    fname: true,
    lname: true,
    username: true,
    email: true,
    password: true,
    role: true,
    createdAt: true,
});
export type FullProfile = z.infer<typeof ProfileSchema>;