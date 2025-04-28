import { TicketDetails } from "@/components/Ticket/pages/TicketDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/$ticketId")({
	component: TicketDetailsComponent,
});

function TicketDetailsComponent() {
	const { ticketId } = Route.useParams();
	return TicketDetails(ticketId);
}
