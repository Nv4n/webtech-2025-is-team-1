import { getCookie } from "@/features/Auth/utils/cookies";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

function isAuthenticated() {
	return !!getCookie("authtoken");
}

export const Route = createFileRoute("/_auth")({
	beforeLoad: () => {
		if (!isAuthenticated()) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: Outlet,
});
