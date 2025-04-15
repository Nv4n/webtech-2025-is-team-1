import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/$ticketId")({
	component: TicketsDetails,
});

function TicketsDetails() {
	return <div>Hello "/tickets/$ticketId"!</div>;
}
