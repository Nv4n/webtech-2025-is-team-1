import { Ticket } from "@/components/Ticket/types/Ticket";

let tickets: Record<string, Ticket> = {
	"1": {
		id: "1",
		title: "Fix login bug",
		status: "in-progress",
		description: "Users are unable to login after password reset.",
		createdAt: new Date("2025-04-10T10:00:00Z"),
		updatedAt: new Date("2025-04-12T14:30:00Z"),
		updatedBy: "2",
		project: "1",
		asignedTo: "5",
	},
	"2": {
		id: "2",
		title: "Add product filtering",
		status: "not-started",
		description:
			"Implement category and price range filtering on products page.",
		createdAt: new Date("2025-04-08T08:20:00Z"),
		updatedAt: new Date("2025-04-08T08:20:00Z"),
		updatedBy: "1",
		project: "2",
	},
	"3": {
		id: "3",
		title: "Upgrade database schema",
		status: "in-progress",
		description:
			"Add missing foreign keys and improve indexing for faster queries.",
		createdAt: new Date("2025-04-05T09:45:00Z"),
		updatedAt: new Date("2025-04-11T13:00:00Z"),
		updatedBy: "4",
		project: "3",
		asignedTo: "6",
	},
	"4": {
		id: "4",
		title: "UI Polish",
		status: "completed",
		description: "Update button styles and fix font inconsistencies.",
		createdAt: new Date("2025-04-01T12:00:00Z"),
		updatedAt: new Date("2025-04-07T15:15:00Z"),
		updatedBy: "3",
		project: "4",
		asignedTo: "1",
	},
	"5": {
		id: "5",
		title: "Implement password strength meter",
		status: "not-started",
		description: "Show real-time password strength while typing.",
		createdAt: new Date("2025-04-14T07:00:00Z"),
		updatedAt: new Date("2025-04-14T07:00:00Z"),
		updatedBy: "7",
		project: "5",
	},
	"6": {
		id: "6",
		title: "Optimize image loading",
		status: "in-progress",
		description: "Lazy load images below the fold to improve page speed.",
		createdAt: new Date("2025-04-03T11:00:00Z"),
		updatedAt: new Date("2025-04-10T10:00:00Z"),
		updatedBy: "6",
		project: "6",
		asignedTo: "9",
	},
	"7": {
		id: "7",
		title: "Fix typo on About page",
		status: "completed",
		description: "Correct 'enviroment' to 'environment'.",
		createdAt: new Date("2025-04-02T15:00:00Z"),
		updatedAt: new Date("2025-04-02T15:45:00Z"),
		updatedBy: "5",
		project: "1",
		asignedTo: "2",
	},
	"8": {
		id: "8",
		title: "Enable dark mode",
		status: "not-started",
		description: "Add a dark mode toggle to the settings menu.",
		createdAt: new Date("2025-04-09T13:00:00Z"),
		updatedAt: new Date("2025-04-09T13:00:00Z"),
		updatedBy: "8",
		project: "2",
	},
	"9": {
		id: "9",
		title: "Fix notification badge count",
		status: "in-progress",
		description: "Badge shows wrong number after reading a message.",
		createdAt: new Date("2025-04-06T10:30:00Z"),
		updatedAt: new Date("2025-04-13T09:00:00Z"),
		updatedBy: "9",
		project: "3",
		asignedTo: "4",
	},
	"10": {
		id: "10",
		title: "Add 2FA authentication",
		status: "not-started",
		description: "Implement two-factor authentication using email or SMS.",
		createdAt: new Date("2025-04-13T11:00:00Z"),
		updatedAt: new Date("2025-04-13T11:00:00Z"),
		updatedBy: "10",
		project: "4",
	},
	"11": {
		id: "11",
		title: "Create onboarding tour",
		status: "in-progress",
		description: "Guide new users through basic app features.",
		createdAt: new Date("2025-04-04T09:00:00Z"),
		updatedAt: new Date("2025-04-08T10:00:00Z"),
		updatedBy: "1",
		project: "5",
		asignedTo: "3",
	},
	"12": {
		id: "12",
		title: "Fix session timeout issue",
		status: "completed",
		description: "Sessions expire too quickly, causing user frustration.",
		createdAt: new Date("2025-04-01T08:00:00Z"),
		updatedAt: new Date("2025-04-05T17:00:00Z"),
		updatedBy: "2",
		project: "6",
		asignedTo: "8",
	},
	"13": {
		id: "13",
		title: "Set up email templates",
		status: "in-progress",
		description:
			"Create reusable templates for welcome and notification emails.",
		createdAt: new Date("2025-04-07T12:00:00Z"),
		updatedAt: new Date("2025-04-10T12:00:00Z"),
		updatedBy: "4",
		project: "1",
		asignedTo: "7",
	},
	"14": {
		id: "14",
		title: "Fix search indexing",
		status: "not-started",
		description: "Search not returning new products added in last 24h.",
		createdAt: new Date("2025-04-12T10:00:00Z"),
		updatedAt: new Date("2025-04-12T10:00:00Z"),
		updatedBy: "5",
		project: "2",
	},
	"15": {
		id: "15",
		title: "Improve dashboard loading speed",
		status: "completed",
		description: "Reduce the API payload size to improve loading times.",
		createdAt: new Date("2025-04-03T13:30:00Z"),
		updatedAt: new Date("2025-04-07T14:00:00Z"),
		updatedBy: "6",
		project: "3",
		asignedTo: "10",
	},
};

export const FakeTicketApi = () => {
	const getTicketDetails = () => {
		return new Promise<Record<string, Ticket>>((resolve) => {
			setTimeout(() => {
				resolve(tickets);
			}, 250);
		});
	};
	const updateTicket = (ticket: Ticket) => {
		if (!ticket.id) {
			return new Promise<Ticket | undefined>((resolve) => {
				setTimeout(() => {
					resolve(undefined);
				}, 250);
			});
		}

		tickets[ticket.id] = ticket;
		return new Promise<Ticket>((resolve) => {
			setTimeout(() => {
				resolve(ticket);
			}, 250);
		});
	};
	return { getTicketDetails, updateTicket };
};
