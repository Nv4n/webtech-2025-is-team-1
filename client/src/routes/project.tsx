import { CreateProjectForm } from "@/features/Project/pages/CreateProject";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project")({
	component: RouteComponent,
});

function RouteComponent() {
	return <CreateProjectForm></CreateProjectForm>;
}
