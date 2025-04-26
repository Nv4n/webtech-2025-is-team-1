import { Button } from "../ui/button";
import { TicketCard } from "./_ticket";

function getUser() {
	const initials = [
		"LM",
		"ZX",
		"AR",
		"QK",
		"JE",
		"NB",
		"WT",
		"CD",
		"HS",
		"UX",
	];
	const fullNames = [
		"Lena Morgan",
		"Zane Xu",
		"Ava Robinson",
		"Quinn Keller",
		"Jasper Ellis",
		"Nina Brooks",
		"Wesley Tran",
		"Clara Diaz",
		"Hugo Silva",
		"Uma Xu",
	];

	let index = Math.floor(Math.random() * 10);
	return { initials: initials[index], fullName: fullNames[index] };
}

function getTicketCard() {
	const ticketTitles = [
		"Fix login bug",
		"Update dashboard UI",
		"Implement search functionality",
		"Resolve payment issue",
		"Add user roles",
		"Optimize database queries",
		"Integrate email notifications",
		"Fix mobile responsiveness",
		"Update API documentation",
		"Improve load times",
	];

	const ticketDescriptions = [
		"Users are unable to log in with Safari.",
		"Redesign the dashboard based on new mockups.",
		"Create a search bar with autocomplete.",
		"Fix the double charge issue in checkout.",
		"Create Admin, Editor, and Viewer roles.",
		"Improve query speed on reports page.",
		"Send confirmation emails after actions.",
		"Ensure layout works on all screen sizes.",
		"Add examples and usage notes to API docs.",
		"Decrease page load time on landing page.",
	];

	const createdDates = [
		"2025-04-01",
		"2025-04-02",
		"2025-04-03",
		"2025-04-04",
		"2025-04-05",
		"2025-04-06",
		"2025-04-07",
		"2025-04-08",
		"2025-04-09",
		"2025-04-10",
	];

	const updatedDates = [
		"2025-04-03",
		"2025-04-04",
		"2025-04-05",
		"2025-04-06",
		"2025-04-07",
		"2025-04-08",
		"2025-04-09",
		"2025-04-10",
		"2025-04-11",
		"2025-04-12",
	];

	let index = Math.floor(Math.random() * 10);

	return {
		title: ticketTitles[index],
		description: ticketDescriptions[index],
		createdAt: createdDates[index],
		updatedAt: updatedDates[index],
		updatedBy: getUser(),
		assignedTo: getUser(),
	};
}

type TicketStatus = {
	status: string;
};

export function TicketsGroup({ status }: TicketStatus) {
	const firstTicket = getTicketCard();
	const secondTicket = getTicketCard();
	const thirdTicket = getTicketCard();

	return (
		<div>
			<div className="flex h-full items-center justify-between">
				<h1>{status}</h1>
				<Button variant="ghost" className="ml-auto">+</Button>
			</div>
			<TicketCard {...firstTicket} />
			<TicketCard {...secondTicket} />
			<TicketCard {...thirdTicket} />
			<Button variant="ghost" className="w-2xs">Add Ticket</Button>
		</div>
	);
}