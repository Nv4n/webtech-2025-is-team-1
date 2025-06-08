import { TicketCreateForm } from "@/features/Ticket/pages/TicketCreateForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/tickets/create")({
    component: TicketCreateForm,
});