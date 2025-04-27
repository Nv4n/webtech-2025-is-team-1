import { Ticket } from "@/components/Ticket/types/Ticket";

export const FakeTicketApi = () => {
	const getTicketDetails = () => {
		const ticket: Ticket = {
			title: "Issue 01",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, repellat. Tempore corporis hic nulla odit sit voluptates ut exercitationem excepturi eaque eligendi earum quidem iusto doloribus nostrum, voluptas, voluptatem error.",
			asignedTo: "2691c583-74b5-5e2c-a359-b6715beec586",
			createdAt: new Date(),
			updatedAt: new Date(),
			updatedBy: "2691c583-74b5-5e2c-a359-b6715beec586",
			status: "TO DO",
			project: "",
		};
		return new Promise<Ticket>((resolve) => {
			setTimeout(() => {
				resolve(ticket);
			}, 1000);
		});
	};
	return { getTicketDetails };
};

export const fetchUsers = async () => [
	{ id: "1", name: "Alice" },
	{ id: "2", name: "Bob" },
];
export const fetchProjects = async () => [
	{ id: "1", title: "Project X" },
	{ id: "2", title: "Project Y" },
];
export const createTicket = async (ticket: Ticket) => {
	return ticket;
};
