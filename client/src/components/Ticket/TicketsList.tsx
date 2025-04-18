import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";

type User = {
	initials: string;
	fullName: string;
};

type Ticket = {
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	updatedBy: User;
	assignedTo: User;
};

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

function TicketCard({
	title,
	description,
	createdAt,
	updatedAt,
	updatedBy,
	assignedTo,
}: Ticket) {
	return (
		<Card className="flex h-[300px] w-2xs flex-col">
			<CardHeader>
				<div className="flex items-center space-x-2">
					<label>Assigned To</label>
					<Avatar>
						<AvatarFallback>
							<HoverCard>
								<HoverCardTrigger>
									{assignedTo.initials}
								</HoverCardTrigger>
								<HoverCardContent>
									{assignedTo.fullName}
								</HoverCardContent>
							</HoverCard>
						</AvatarFallback>
					</Avatar>
				</div>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col">
				<CardTitle className="pb-4">{title}</CardTitle>
				<div className="text-muted-foreground max-h-[200px] overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
					{description}
				</div>
			</CardContent>

			<CardFooter className="flex flex-col items-start gap-4">
				<div className="flex items-center space-x-2">
					<label>Created At</label>
					<Badge variant="outline">{createdAt}</Badge>
				</div>
				<div className="flex items-center space-x-2">
					<label>Updated At</label>
					<Badge variant="outline">{updatedAt}</Badge>
				</div>
				<div>
					<div className="flex items-center space-x-2">
						<label>Updated By</label>
						<Avatar>
							<AvatarFallback>
								<HoverCard>
									<HoverCardTrigger>
										{updatedBy.initials}
									</HoverCardTrigger>
									<HoverCardContent>
										{updatedBy.fullName}
									</HoverCardContent>
								</HoverCard>
							</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}

type TicketStatus = {
	status: string;
};

function TicketsGroup({ status }: TicketStatus) {
	const firstTicket = getTicketCard();
	const secondTicket = getTicketCard();
	const thirdTicket = getTicketCard();

	return (
		<div>
			<div className="flex h-full items-center justify-between">
				<h1>{status}</h1>
				<Button variant="ghost" className="ml-auto">+</Button>
			</div>
			<TicketCard {...firstTicket}></TicketCard>
			<TicketCard {...secondTicket}></TicketCard>
			<TicketCard {...thirdTicket}></TicketCard>
			<Button variant="ghost" className="w-2xs">Add Ticket</Button>
		</div>
	);
}

export function TicketsList() {
	return (
		<div className="flex h-full items-center justify-between">
			<TicketsGroup status="Not started" />
			<TicketsGroup status="In Progress" />
			<TicketsGroup status="Completed" />
		</div>
	);
}
