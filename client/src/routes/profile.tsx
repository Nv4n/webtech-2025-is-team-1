import { ProfileData } from "@/features/Profile/pages/PreviewProfileData";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: ProfileDataWrapper,
});

function ProfileDataWrapper() {
  return <ProfileData id={"2"} />;
}