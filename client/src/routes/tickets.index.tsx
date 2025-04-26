import { TicketsListComponent } from "@/components/Ticket/ticket-group";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/")({
	component: TicketsListComponent,
});
