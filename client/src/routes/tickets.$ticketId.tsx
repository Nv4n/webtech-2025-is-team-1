import { TicketDetails } from "@/components/Ticket/TicketDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/$ticketId")({
	component: TicketDetails,
});
