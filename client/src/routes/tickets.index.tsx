import { TicketsListComponent } from "@/components/ticket/ticket-group";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/")({
	component: TicketsListComponent,
});
