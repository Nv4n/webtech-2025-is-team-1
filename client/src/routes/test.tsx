import { TestView } from "@/features/Test/Test";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<p>TEST</p>
			<TestView></TestView>
		</>
	);
}
