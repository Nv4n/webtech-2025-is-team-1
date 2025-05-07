import { TicketsDashboard } from "@/components/Ticket/pages/TicketsDashBoard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/")({
	component: TicketsDashboard,
});
