import RegisterForm from "@/features/Auth/pages/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RegisterForm,
});
