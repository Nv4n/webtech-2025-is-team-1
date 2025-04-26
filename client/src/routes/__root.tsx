import { ThemeButton } from "@/components/ThemeButton";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link to="/">
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									{" "}
									Home
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link to="/profile">
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									Profile
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								to="/tickets/$ticketId"
								params={{ ticketId: "1" }}
							>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									Tickets/1
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							{" "}
							<ThemeButton />
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<hr className="mb-4" />
				<Outlet />
				<TanStackRouterDevtools />
			</>
		);
	},
});
