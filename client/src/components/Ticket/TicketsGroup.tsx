import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@radix-ui/react-tooltip";

// Fake API imports
import { FakeProfileApi } from "../Profile/service/profileApi";
import { FakeTicketApi } from "../Ticket/service/ticketApi";
import { FakeProjectApi } from "../Project/service/projectApi";
import { TicketCard } from "./TicketCard"; // Assuming TicketCard is another component you have
import { CirclePlus } from "lucide-react";

// Types
type TicketStatus = {
	status: string;
};

export function TicketsGroup({ status }: TicketStatus) {
	const [tickets, setTickets] = useState<any[]>([]);
	const [users, setUsers] = useState<any[]>([]);
	const [projects, setProjects] = useState<any[]>([]);

	useEffect(() => {
		// Fetch ticket data, profile data (users), and project data
		const fetchData = async () => {
			const ticketApi = FakeTicketApi();
			const profileApi = FakeProfileApi();
			const projectApi = FakeProjectApi();

			const [ticketData, userData, projectData] = await Promise.all([
				ticketApi.getTicketDetails(),
				profileApi.getProfileList(),
				projectApi.getProjectList(),
			]);

			// Convert records to arrays
			const ticketArray = Object.values(ticketData);
			const userArray = Object.values(userData);
			const projectArray = Object.values(projectData);

			// Map ticket data and add user & project details
			const ticketsWithDetails = ticketArray.map((ticket) => {
				const updatedBy = userArray.find(
					(user) => user.id === ticket.updatedBy
				);
				const assignedTo = userArray.find(
					(user) => user.id === ticket.asignedTo
				);
				const project = projectArray.find(
					(proj) => proj.id === ticket.project
				);

				return {
					...ticket,
					updatedBy: updatedBy
						? `${updatedBy.fname} ${updatedBy.lname}`
						: "Unknown",
					assignedTo: assignedTo
						? `${assignedTo.fname} ${assignedTo.lname}`
						: "Unassigned",
					project, // Pass the full project object here
				};
			});

			setTickets(ticketsWithDetails);
			setUsers(userArray);
			setProjects(projectArray);
		};

		fetchData();
	}, [status]);

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
					.map((ticket) => <TicketCard key={ticket.id} {...ticket} />)
			) : (
				<div>Loading tickets...</div>
			)}

			<Button variant="ghost" className="w-2xs cursor-pointer">
				<pre>Add Ticket</pre>
			</Button>
		</div>
	);
}
