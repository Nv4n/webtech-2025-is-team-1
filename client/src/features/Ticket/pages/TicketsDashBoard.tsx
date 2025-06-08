import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { TicketsFilter } from "@/features/Ticket/components/TicketFilter";
import { TicketsGroup } from "@/features/Ticket/components/TicketsGroup";
import { useGetApiTickets } from "@/features/Ticket/service/ticketApiQueries";
import { TicketStatuses } from "@/features/Ticket/types/Ticket";
import { TicketFilter } from "@/features/Ticket/types/TicketFilter";

type TicketDashboardProps = {
	filter?: TicketFilter;
};

export function TicketsDashboard({ filter }: TicketDashboardProps) {
	console.log(filter);

	const { data: tickets, isLoading: isTicketsLoading } =
		useGetApiTickets(filter);

	if (isTicketsLoading) {
		return (
			<>
				<div className="mx-auto my-0 w-fit flex-col space-y-3">
					<Skeleton className="h-[125px] w-[250px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</>
		);
	}
	return (
		<div>
			<div className="flex w-2xl px-8">
				<TicketsFilter />
			</div>
			<ScrollArea className="mx-auto my-0 max-w-7xl space-x-4 rounded-md border p-4 whitespace-nowrap">
				<ScrollBar
					className="fixed top-2 left-0"
					orientation="horizontal"
				/>
				<div className="flex gap-16">
					{filter?.statuses
						? filter.statuses.map((status) => {
								return (
									<TicketsGroup
										key={status}
										status={status}
										filter={filter}
									/>
								);
							})
						: TicketStatuses.map((status) => {
								return (
									<TicketsGroup
										key={status}
										status={status}
									/>
								);
							})}
				</div>
			</ScrollArea>
		</div>
	);
}

// export function TicketsDashboardWithFilter() {
// 	return (
// 		<div>
// 			<TicketsFilter />
// 			<div className="flex w-full justify-center space-x-4 p-4">
// 				{TicketStatuses.map((status) => {
// 					// console.log(status);

// 					return <TicketsGroup />;
// 				})}
// 			</div>
// 		</div>
// 	);
// }
