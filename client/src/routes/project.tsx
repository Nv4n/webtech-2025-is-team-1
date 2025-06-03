import { CreateProjectForm } from "@/features/Workflow/components/WorkflowForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project")({
	component: RouteComponent,
});

function RouteComponent() {
	return <CreateProjectForm></CreateProjectForm>;
}
