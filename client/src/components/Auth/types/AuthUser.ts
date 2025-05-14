import { UserSchema } from "@/components/Profile/types/Profile";

const RegisterSchema = UserSchema.omit({
	id: true,
	createdAt: true,
	role: true,
});
