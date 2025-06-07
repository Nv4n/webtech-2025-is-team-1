import { Route as RegisterRoute } from "@/routes/register";
import { ThemeButton } from "@/components/ThemeButton";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const NavMenuLinkStyles =
	"data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4";

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link
								to="/"
								className={cn(
									NavMenuLinkStyles,
									navigationMenuTriggerStyle()
								)}
								data-slot="navigation-menu-link"
							>
								Home
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								to={"/register"}
								className={cn(
									NavMenuLinkStyles,
									navigationMenuTriggerStyle()
								)}
								data-slot="navigation-menu-link"
							>
								Register
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								to={"/login"}
								className={cn(
									NavMenuLinkStyles,
									navigationMenuTriggerStyle()
								)}
								data-slot="navigation-menu-link"
							>
								Login
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											to="/profile"
											className={cn(
												NavMenuLinkStyles,
												navigationMenuTriggerStyle()
											)}
											data-slot="navigation-menu-link"
											disabled
										>
											Profile
										</Link>
									</TooltipTrigger>
									<TooltipContent className="rounded-md border bg-gray-100 p-2 text-gray-800 shadow-md">
										<pre>
											Profile access will be available
											shortly. Thank you for your
											patience.
										</pre>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								to="/projects/create"
								className={cn(
									NavMenuLinkStyles,
									navigationMenuTriggerStyle()
								)}
								data-slot="navigation-menu-link"
							>
								Project
							</Link>
						</NavigationMenuItem>
						{/* <NavigationMenuItem>
							<Link
								to="/tickets/$ticketId"
								params={{ ticketId: "1" }}
								className={cn(
									NavMenuLinkStyles,
									navigationMenuTriggerStyle()
								)}
								data-slot="navigation-menu-link"
							>
								Tickets/1
							</Link>
						</NavigationMenuItem> */}
						{/* <NavigationMenuItem>
							<Link
								to="/tickets/$ticketId/edit"
								params={{ ticketId: "1" }}
								className={cn(
									NavMenuLinkStyles,
									navigationMenuTriggerStyle()
								)}
								data-slot="navigation-menu-link"
							>
								Tickets/1/edit
							</Link>
						</NavigationMenuItem> */}

						<NavigationMenuItem>
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
