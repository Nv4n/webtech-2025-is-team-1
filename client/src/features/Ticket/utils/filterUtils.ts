import { FetchingUserSchema } from "@/features/Profile/types/Profile";
import { Project } from "@/features/Project/types/Project";
import { TicketStatuses } from "@/features/Ticket/types/Ticket";
import { ListTodo } from "lucide-react";
import z from "zod";

export function getStatusFilterList() {
	return Object.keys(TicketStatuses).map((key) => {
		return {
			value: key,
			label: TicketStatuses[parseInt(key)].replace(
				/([a-z])([A-Z])/g,
				"$1 $2"
			),
			icon: ListTodo,
		};
	});
}

export function getProjectFilterList(projects: Project[]) {
	return projects.map((project) => {
		return {
			value: project.id || "",
			label: project.name,
			icon: ListTodo,
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
			icon: ListTodo,
		};
	});
}
