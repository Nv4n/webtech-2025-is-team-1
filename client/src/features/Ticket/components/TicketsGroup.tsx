import { NavMenuLinkStyles } from "@/components/NavMenuLinkStyles";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TicketCard } from "@/features/Ticket/components/TicketCard";
import { useGetFilteredApiTickets } from "@/features/Ticket/service/ticketApiQueries";
import { TicketFilter } from "@/features/Ticket/types/TicketFilter";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { CirclePlus } from "lucide-react";

type TicketCardProps = {
	filter: TicketFilter;
	styles?: string;
};

export function TicketsGroup({ filter, styles }: TicketCardProps) {
	const { data: tickets, isLoading: isTicketListLoading } =
		useGetFilteredApiTickets(filter);

	if (isTicketListLoading) {
		return (
			<div className="mx-auto my-0 w-fit flex-col space-y-3">
				<Skeleton className="h-[125px] w-[250px] rounded-xl" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		);
	}

	return (
		<div className={cn("flex w-1/3 flex-col space-y-4", styles)}>
			<div className="flex w-2xs items-center justify-between">
				{filter.statuses && (
					<h1>
						{filter.statuses[0].replace(/([a-z])([A-Z])/g, "$1 $2")}
					</h1>
				)}
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
			{tickets &&
				tickets
					.filter((ticket) => ticket.status === filter?.statuses?.[0])
					.map((ticket) =>
						ticket.id && ticket.project ? (
							<TicketCard
								updatedAt={ticket.updatedAt}
								// updatedBy={ticket.updatedBy}
								project={ticket.project}
								id={ticket.id}
								title={ticket.title}
								status={String(ticket.status)}
								key={ticket.id}
								//TODO NOT SURE WHAT IS THIS
								// {...ticket}
							></TicketCard>
						) : null
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
