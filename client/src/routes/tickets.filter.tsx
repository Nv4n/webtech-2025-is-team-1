import { TicketsDashboard } from "@/features/Ticket/pages/TicketsDashBoard";
import {
	TicketFilter,
	TicketFilterSchema,
} from "@/features/Ticket/types/TicketFilter";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

let filter: TicketFilter;

export const Route = createFileRoute("/tickets/filter")({
	validateSearch: zodValidator(TicketFilterSchema),
	beforeLoad: (search) => {
		filter = search.search;
	},
	component: () => {
		return <RouteComponent></RouteComponent>;
	},
});

function RouteComponent() {
	return <TicketsDashboard filter={filter} />;
}
