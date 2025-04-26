import { TicketsDashboard } from "@/components/Ticket/TicketsDashBoard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: TicketsDashboard,
});
