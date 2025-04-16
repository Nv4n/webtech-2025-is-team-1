import { TicketsList } from "@/components/Ticket/TicketsList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/")({
	component: TicketsList,
});
