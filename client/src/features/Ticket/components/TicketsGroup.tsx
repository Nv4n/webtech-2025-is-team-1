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
import { useGetApiTickets } from "@/features/Ticket/service/ticketApiQueries";
import { TicketFilter } from "@/features/Ticket/types/TicketFilter";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { CirclePlus } from "lucide-react";

type TicketCardProps = {
	status: string;
	filter?: TicketFilter;
	styles?: string;
};

export function TicketsGroup({ status, filter, styles }: TicketCardProps) {
	const { data: tickets, isLoading: isTicketListLoading } =
		useGetApiTickets(filter);

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
				<h1>{status}</h1>
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
					.filter((ticket) => ticket.status === status)
					.map((ticket) => {
						return ticket.id && ticket.projectId ? (
							<TicketCard
								updatedAt={ticket.updatedAt}
								// updatedBy={ticket.updatedBy}
								project={ticket.projectId}
								id={ticket.id}
								title={ticket.title}
								status={String(ticket.status)}
								key={ticket.id}
							></TicketCard>
						) : null;
					})}

			{tickets && (
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
			)}
		</div>
	);
}
