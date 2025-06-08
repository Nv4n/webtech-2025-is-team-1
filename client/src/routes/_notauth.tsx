import { getCookie } from "@/features/Auth/utils/cookies";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

function isAuthenticated() {
	return !!getCookie("authtoken");
}

export const Route = createFileRoute("/_notauth")({
	beforeLoad: () => {
		if (isAuthenticated()) {
			throw redirect({
				to: "/",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: Outlet,
});
