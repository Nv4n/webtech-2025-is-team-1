import { TicketsFilter } from "@/features/Ticket/components/TicketFilter";
import { TicketsGroup } from "@/features/Ticket/components/TicketsGroup";
import { TicketStatuses } from "@/features/Ticket/types/Ticket";

export function TicketsDashboard() {
	return (
		<div>
			<TicketsFilter />
			<div className="flex w-full justify-center space-x-4 p-4">
				<TicketsGroup status="not-started" />
				<TicketsGroup status="in-progress" />
				<TicketsGroup status="completed" />
			</div>
		</div>
	);
}

export function TicketsDashboardWithFilter() {
	return (
		<div>
			<TicketsFilter />
			<div className="flex w-full justify-center space-x-4 p-4">
				{TicketStatuses.map((status) => {
					return <TicketsGroup status={status} />;
				})}
			</div>
		</div>
	);
}
