
import { TicketCard, TicketCardProps } from "@/components/Ticket/TicketCard";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CirclePlus } from "lucide-react";

import { User, UserSchema } from "@/components/Profile/types/Profile";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const passwordValidChars =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const generateRandomString = (length: number, chars: string): string => {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

function getUser(): z.infer<typeof UserSchema> {
	const firstName = generateRandomString(5, alphabet);
	const lastName = generateRandomString(5, alphabet);
	const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
	const password = generateRandomString(8, passwordValidChars);
	const id = uuidv4();

	const user = {
		id,
		fname: firstName,
		lname: lastName,
		username,
		password,
	};

	UserSchema.parse(user);

	return user;
}

const generateRandomProjectName = (): string => {
	const projects = ["Apollo", "Zeus", "Hermes", "Athena", "Hera"];
	return projects[Math.floor(Math.random() * projects.length)];
};

export const getTicketCard = (status: string): TicketCardProps => {
	const numberOfUsers = Math.floor(Math.random() * 5) + 1; // 1-5 users
	const users: Record<string, User> = {};
	for (let i = 0; i < numberOfUsers; i++) {
		const user = getUser();
		users[user.id] = user;
	}

	const createdAt = new Date(
		Date.now() - Math.floor(Math.random() * 1000000000)
	); // Random past date
	const updatedAt = new Date(
		createdAt.getTime() + Math.floor(Math.random() * 500000000)
	); // After createdAt

	const updatedBy = {
		fname: generateRandomString(5, alphabet),
		lname: generateRandomString(7, alphabet),
		username: generateRandomString(8, alphabet),
	};
	const project = {
		id: "",
		name: generateRandomProjectName(),
	}
	return {
		id: uuidv4(),
		title: generateRandomString(10, alphabet),
		updatedAt: updatedAt,
		updatedBy: updatedBy,
		project: project,
		status: status,
	};
};

type TicketStatus = {
	status: string;
};

export function TicketsGroup({ status }: TicketStatus) {
	const firstTicket = getTicketCard(status);
	const secondTicket = getTicketCard(status);
	const thirdTicket = getTicketCard(status);

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
			<TicketCard {...firstTicket} />
			<TicketCard {...secondTicket} />
			<TicketCard {...thirdTicket} />

			<Button variant="ghost" className="w-2xs cursor-pointer">
				<pre>Add Ticket</pre>
			</Button>
		</div>
	);
}