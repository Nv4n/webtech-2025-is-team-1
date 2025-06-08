import { TicketsDashboard } from "@/features/Ticket/pages/TicketsDashBoard";
import {
	TicketFilterSchema
} from "@/features/Ticket/types/TicketFilter";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/_auth/tickets/filter")({
	validateSearch: zodValidator(TicketFilterSchema),
	component: () => {
		return <RouteComponent></RouteComponent>;
	},
});

function RouteComponent() {
	const filter = Route.useSearch();
	return <TicketsDashboard filter={filter} />;
}
