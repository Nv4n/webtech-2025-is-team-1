import { TicketsGroup } from "@/components/Ticket/TicketsGroup";

export function TicketsDashboard() {
	return (
		<div className="flex justify-center space-x-4 p-4 w-full">
			<TicketsGroup status="not-started" />
			<TicketsGroup status="in-progress" />
			<TicketsGroup status="completed" />
		</div>
	);
};