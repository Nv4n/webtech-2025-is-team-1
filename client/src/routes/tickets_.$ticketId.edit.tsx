import { TicketEditForm } from "@/components/Ticket/pages/TicketEditForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets_/$ticketId/edit")({
	component: TicketEditComponent,
});

function TicketEditComponent() {
	const { ticketId } = Route.useParams();
	return TicketEditForm(ticketId);
}
