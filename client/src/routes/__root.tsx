import { ButtonIcon, ThemeButton } from "@/components/ThemeButton";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<div className="flex gap-2 p-2">
					<Link to="/" className="[&.active]:font-bold">
						Home
					</Link>
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
					<ThemeButton />
				</div>
				<hr className="mb-4" />
				<Outlet />
				<TanStackRouterDevtools />
			</>
		);
	},
});
