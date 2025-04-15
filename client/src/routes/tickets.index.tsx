import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/")({
	component: TicketList,
});

export function TicketList() {
	return <div>Hello "/tickets"!</div>;
}
