import { TestFilter } from "@/features/Ticket/TicketFilter";
import { TicketsGroup } from "@/features/Ticket/TicketsGroup";

export function TicketsDashboard() {
	return (
		<div>
			<TestFilter />
			<div className="flex w-full justify-center space-x-4 p-4">
				<TicketsGroup status="not-started" />
				<TicketsGroup status="in-progress" />
				<TicketsGroup status="completed" />
			</div>
		</div>
	);
}
