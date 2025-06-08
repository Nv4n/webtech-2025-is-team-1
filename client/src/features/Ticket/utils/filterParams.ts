import { TicketFilter } from "@/features/Ticket/types/TicketFilter";

export function getFilterParams(filter: TicketFilter) {
	const params = new URLSearchParams();
	if (filter.statuses) {
		filter.statuses.forEach((status) => params.append("statuses", status));
	}
	if (filter.projectIds) {
		filter.projectIds.forEach((projId) =>
			params.append("projectIds", projId.toString())
		);
	}
	if (filter.assigneeIds) {
		filter.assigneeIds.forEach((assigneeId) =>
			params.append("assigneeIds", assigneeId.toString())
		);
	}
	return params;
}
