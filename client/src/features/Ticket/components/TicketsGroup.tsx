import { NavMenuLinkStyles } from "@/components/NavMenuLinkStyles";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TicketCard } from "@/features/Ticket/components/TicketCard";
import { useGetFilteredTickets } from "@/features/Ticket/service/ticketApiQueries";
import { TicketFilter } from "@/features/Ticket/types/TicketFilter";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { CirclePlus } from "lucide-react";

export function TicketsGroup(filter: TicketFilter = {}) {
	const tickets = useGetFilteredTickets(filter);
	console.log(tickets);

	// console.log(status);
	// console.log(tickets[1]?.status);

	return (
		<div className="flex w-1/3 flex-col space-y-4">
			<div className="flex w-2xs items-center justify-between">
				{<h1>{status.replace(/([a-z])([A-Z])/g, "$1 $2")}</h1>}
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
								<CirclePlus></CirclePlus>
								<span className="sr-only">Add Ticket</span>
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
								// updatedBy={ticket.updatedBy}
								project={ticket.project.name}
								id={ticket.id}
								title={ticket.title}
								status={String(ticket.status)}
								key={ticket.id}
								//TODO NOT SURE WHAT IS THIS
								// {...ticket}
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
