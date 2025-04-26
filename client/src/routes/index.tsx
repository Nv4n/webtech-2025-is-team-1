import { TicketsDashboard } from "@/components/ticket/tickets-dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: TicketsDashboard,
});