import { ProjectEditForm } from "@/features/Project/pages/ProjectEditForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects_/$projectId/edit")({
	component: ProjectEditComponent,
});

function ProjectEditComponent() {
	const { projectId } = Route.useParams();
	return ProjectEditForm(projectId);
}
