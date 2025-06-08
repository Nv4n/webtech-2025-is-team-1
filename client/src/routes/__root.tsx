import { NavMenuLinkStyles } from "@/components/NavMenuLinkStyles";
import { ThemeButton } from "@/components/ThemeButton";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
	CatchBoundary,
	createRootRoute,
	Link,
	Outlet,
	useNavigate,
	useRouter
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { toast } from "sonner";


export const Route = createRootRoute({
	component: () => {
		const router = useRouter();
		const navigate = useNavigate();
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
								to="/profile"
								className={cn(
									NavMenuLinkStyles,
									navigationMenuTriggerStyle()
								)}
								data-slot="navigation-menu-link"
							>
								Profile
							</Link>
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
				<CatchBoundary
					getResetKey={() => "reset"}
					onCatch={(error) => {
						console.error(error);
						toast.error(
							error instanceof Error
								? error.message
								: String(error)
						);
					}}
				>
					<Outlet />
				</CatchBoundary>

				<TanStackRouterDevtools />
			</>
		);
	},
});
