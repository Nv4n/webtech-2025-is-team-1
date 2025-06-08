import { FetchingUserSchema } from "@/features/Profile/types/Profile";
import { Project } from "@/features/Project/types/Project";
import { TicketStatuses } from "@/features/Ticket/types/Ticket";
import z from "zod";

export function getStatusFilterList() {
	return Object.keys(TicketStatuses).map((key) => {
		return {
			value: TicketStatuses[parseInt(key)],
			label: TicketStatuses[parseInt(key)].replace(
				/([a-z])([A-Z])/g,
				"$1 $2"
			),
		};
	});
}

export function getProjectFilterList(projects: Project[]) {
	return projects.map((project) => {
		return {
			value: project.id || "",
			label: project.name,
		};
	});
}

export function getUsersFilterList(
	users: z.infer<typeof FetchingUserSchema>[]
) {
	return users.map((user) => {
		return {
			value: user.id || "",
			label: user.username,
		};
	});
}
