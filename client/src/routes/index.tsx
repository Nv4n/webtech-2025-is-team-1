import { createFileRoute } from "@tanstack/react-router";
import { TicketList } from "./tickets.index";

export const Route = createFileRoute("/")({
	component: TicketList,
});
