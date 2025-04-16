import { TicketList } from "@/components/Ticket/TicketList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: TicketList,
});
