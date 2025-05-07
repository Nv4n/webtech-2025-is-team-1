import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";

// Fake API imports
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { FakeProfileApi } from "../Profile/service/profileApi";
import { FakeProjectApi } from "../Project/service/projectApi"; // Assuming TicketCard is another component you have
import { FakeTicketApi } from "../Ticket/service/ticketApi";
import { TicketCard } from "./TicketCard";

// Types
type TicketStatus = {
	status: string;
};

function fetchTicketDetails() {
	const { data: ticketList, isLoading: isLoadingTickets } = useQuery({
		queryKey: ["tickets"],
		queryFn: () => {
			return FakeTicketApi().getTicketDetails();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	const { data: userList, isLoading: isLoadingUsers } = useQuery({
		queryKey: ["users"],
		queryFn: () => {
			return FakeProfileApi().getProfileList();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	const { data: projectList, isLoading: isLoadingProjects } = useQuery({
		queryKey: ["projects"],
		queryFn: () => {
			return FakeProjectApi().getProjectList();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	if (isLoadingProjects || isLoadingTickets || isLoadingUsers) {
		return [];
	}
	if (!ticketList || !userList || !projectList) {
		return [];
	}
	const ticketsWithDetails = ticketList.map((ticket) => {
		const updatedBy = userList.find((user) => user.id === ticket.updatedBy);
		const assignedTo = userList.find(
			(user) => user.id === ticket.asignedTo
		);
		const project = projectList.find((proj) => proj.id === ticket.project);

		return {
			...ticket,
			updatedBy: updatedBy ? updatedBy : {},
			assignedTo: assignedTo ? assignedTo : {},
			project,
		};
	});
	return ticketsWithDetails;
}

export function TicketsGroup({ status }: TicketStatus) {
	const tickets = fetchTicketDetails();
	return (
		<div className="flex w-1/3 flex-col space-y-4">
			<div className="flex w-2xs items-center justify-between">
				{status === "not-started" && <h1>Not Started</h1>}
				{status === "in-progress" && <h1>In Progress</h1>}
				{status === "completed" && <h1>Completed</h1>}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" className="cursor-pointer">
								<CirclePlus />
							</Button>
						</TooltipTrigger>
						<TooltipContent className="rounded-md border bg-gray-100 p-2 text-gray-800 shadow-md">
							<pre>Add Ticket</pre>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			{tickets.length > 0 ? (
				tickets
					.filter((ticket) => ticket.status === status)
					.map((ticket) =>
						ticket.id && ticket.project?.id ? (
							<TicketCard
								updatedAt={ticket.updatedAt}
								updatedBy={ticket.updatedBy}
								project={ticket.project.name}
								id={ticket.id}
								title={ticket.title}
								status={ticket.status}
								key={ticket.id}
								{...tickets}
							></TicketCard>
						) : null
					)
			) : (
				<div>Loading tickets...</div>
			)}

			<Button variant="ghost" className="w-2xs cursor-pointer">
				<pre>Add Ticket</pre>
			</Button>
		</div>
	);
}
