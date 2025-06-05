import LoginForm from "@/features/Auth/pages/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginForm,
});