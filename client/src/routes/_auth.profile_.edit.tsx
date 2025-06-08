import { ProfileEditForm } from "@/features/Profile/pages/ProfileEditForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile_/edit")({
	component: ProfileEditForm,
});
