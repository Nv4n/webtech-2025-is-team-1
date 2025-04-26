import { TicketsListComponent } from "@/components/Ticket/TicketsListComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets/")({
	component: TicketsListComponent,
});