import { TicketsDashboard } from "@/features/Ticket/pages/TicketsDashBoard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: TicketsDashboard,
});
