import { TicketForm } from "@/components/Ticket/TicketEditForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets_/$ticketId/edit")({
	component: TicketForm,
});
