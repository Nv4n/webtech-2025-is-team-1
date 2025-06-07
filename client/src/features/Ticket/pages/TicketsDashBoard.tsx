import { TicketsFilter } from "@/features/Ticket/components/TicketFilter";
import { TicketsGroup } from "@/features/Ticket/components/TicketsGroup";

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
				<TicketsGroup status="not-started" />
				<TicketsGroup status="in-progress" />
				<TicketsGroup status="completed" />
			</div>
		</div>
	);
}
