import { RegisterForm } from "@/features/Auth/pages/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_notauth/register")({
  component: RegisterForm,
});
