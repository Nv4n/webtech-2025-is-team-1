import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { FakeProfileApi } from "@/features/Profile/service/profileApi";
import { FakeProjectApi } from "@/features/Project/service/projectApi";
import { TicketCard } from "@/features/Ticket/components/TicketCard";
import { FakeTicketApi } from "@/features/Ticket/service/ticketApi";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

type TicketStatus = {
	status: string;
};

const fallBackProfile = {
	fname: "Unknown",
	lname: "User",
	username: "unknown",
	id: "",
};

const NavMenuLinkStyles =
	"data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4";

function fetchTicketDetails() {
	const { data: ticketList, isLoading: isLoadingTickets } = useQuery({
		queryKey: ["tickets"],
		queryFn: () => {
			return FakeTicketApi().getTicketList();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	const { data: userList, isLoading: isLoadingUsers } = useQuery({
		queryKey: ["users"],
		queryFn: () => {
			return FakeProfileApi().getProfileList();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	const { data: projectList, isLoading: isLoadingProjects } = useQuery({
		queryKey: ["projects"],
		queryFn: () => {
			return FakeProjectApi().getProjectList();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	if (isLoadingProjects || isLoadingTickets || isLoadingUsers) {
		return [];
	}
	if (!ticketList || !userList || !projectList) {
		return [];
	}
	const ticketsWithDetails = ticketList.map((ticket) => {
		const updatedBy = userList.find((user) => user.id === ticket.updatedBy);
		const assignedTo = userList.find((user) => user.id === ticket.assignee);
		const project = projectList.find((proj) => proj.id === ticket.project);

		return {
			...ticket,
			updatedBy: updatedBy ?? fallBackProfile,
			assignedTo: assignedTo ?? fallBackProfile,
			project,
		};
	});

	return ticketsWithDetails;
}

export function TicketsGroup({ status }: TicketStatus) {
	const tickets = fetchTicketDetails();
	return (
		<div className="flex w-1/3 flex-col space-y-4">
			<div className="flex w-2xs items-center justify-between">
				{status === "not-started" && <h1>Not Started</h1>}
				{status === "in-progress" && <h1>In Progress</h1>}
				{status === "completed" && <h1>Completed</h1>}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to="/tickets/create"
								className={cn(
									NavMenuLinkStyles,
									navigationMenuTriggerStyle()
								)}
								data-slot="navigation-menu-link"
							>
								<pre>Add Ticket</pre>
							</Link>
						</TooltipTrigger>
						<TooltipContent className="z-10 rounded-md border bg-gray-100 p-2 text-gray-800 shadow-md">
							<pre>Add Ticket</pre>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			{tickets.length > 0 ? (
				tickets
					.filter((ticket) => ticket.status === status)
					.map((ticket) =>
						ticket.id && ticket.project?.id ? (
							<TicketCard
								updatedAt={ticket.updatedAt}
								updatedBy={ticket.updatedBy}
								project={ticket.project.name}
								id={ticket.id}
								title={ticket.title}
								status={ticket.status}
								key={ticket.id}
								{...tickets}
							></TicketCard>
						) : null
					)
			) : (
				<div>Loading tickets...</div>
			)}
			<Link
				to="/tickets/create"
				className={cn(NavMenuLinkStyles, navigationMenuTriggerStyle())}
				data-slot="navigation-menu-link"
			>
				<pre>Add Ticket</pre>
			</Link>
		</div>
	);
}
