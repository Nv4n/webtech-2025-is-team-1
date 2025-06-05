import { createFileRoute } from "@tanstack/react-router";

type TicketStatusSearchOptions = "not-started" | "in-progress" | "completed";

type TicketSearch = {
	page: number;
	filter: string;
	sort: TicketStatusSearchOptions;
};

// export const Route = createFileRoute('/tickets')
