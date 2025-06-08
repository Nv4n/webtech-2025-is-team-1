import { ProjectCreateForm } from "@/features/Project/pages/ProjectCreateForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/projects/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ProjectCreateForm></ProjectCreateForm>;
}
