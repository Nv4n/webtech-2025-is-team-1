import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="flex gap-2 p-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/profile" className="[&.active]:font-bold">
					Profile
				</Link>
				<Link
					to="/tickets/$ticketId"
					className="[&.active]:font-bold"
					params={{ ticketId: "1" }}
				>
					Tickets/1
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
