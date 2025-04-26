import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardFooter,
} from "../ui/card";
import { _Date } from "../_date";
import { User } from "../user";
import { Badge } from "@/components/ui/badge";

type User = {
	initials: string;
	fullName: string;
	email: string;
};

type Ticket = {
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	updatedBy: User;
	assignedTo: User;
	project: string;
	status: string;
};

export function TicketCard({
	title,
	description,
	createdAt,
	updatedAt,
	updatedBy,
	assignedTo,
	project,
	status,
}: Ticket) {
	return (
		<Card className="flex h-[350px] w-2xs flex-col">
			<CardHeader>
				<Badge variant="default">{project}</Badge>
				<User
					labelContent="Assigned To"
					initials={assignedTo.initials}
					fullName={assignedTo.fullName}
					email={assignedTo.email}
				/>
				{status === "not-started" && (
					<Badge variant="default" className="bg-red-700">
						{status}
					</Badge>
				)}
				{status === "in-progress" && (
					<Badge variant="default" className="bg-amber-300">
						{status}
					</Badge>
				)}
				{status === "completed" && (
					<Badge variant="default" className="bg-green-900">
						{status}
					</Badge>
				)}
			</CardHeader>

			<CardContent className="flex flex-1 flex-col">
				<CardTitle className="pb-4">{title}</CardTitle>
				<div className="text-muted-foreground max-h-[200px] overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
					{description}
				</div>
			</CardContent>

			<CardFooter className="flex flex-col items-start gap-4">
				<_Date labelContent="Crated At" date={createdAt} />
				<_Date labelContent="Updated At" date={updatedAt} />
				<User
					labelContent="Upadated By"
					initials={updatedBy.initials}
					fullName={updatedBy.fullName}
					email={updatedBy.email}
				/>
			</CardFooter>
		</Card>
	);
}
