import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
	beforeLoad: async () => {
		throw new Error("TEST LINK ERRORS");
		// throw redirect({ to: "/", replace: true });
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/profile"!</div>;
}
