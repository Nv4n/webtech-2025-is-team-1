import { TicketsGroup } from "@/components/Ticket/TicketsGroup";
import { TicketFilter } from "../TicketFilter/TicketFilter";

export function TicketsDashboard() {
	return (
		<div>
			<TicketFilter />
			<div className="flex w-full justify-center space-x-4 p-4">
				<TicketsGroup status="not-started" />
				<TicketsGroup status="in-progress" />
				<TicketsGroup status="completed" />
			</div>
		</div>
	);
}
