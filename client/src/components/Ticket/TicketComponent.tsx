import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardFooter,
} from "../ui/card";
import { DateComponent } from "../DateComponent";
import { UserComponent } from "../UserComponent";

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
				<UserComponent
					labelContent="Assigned To"
					initials={assignedTo.initials}
					fullName={assignedTo.fullName}
				/>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col">
				<CardTitle className="pb-4">{title}</CardTitle>
				<div className="text-muted-foreground max-h-[200px] overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
					{description}
				</div>
			</CardContent>

			<CardFooter className="flex flex-col items-start gap-4">
				<DateComponent labelContent="Crated At" date={createdAt} />
				<DateComponent labelContent="Updated At" date={updatedAt} />
				<UserComponent
					labelContent="Upadated By"
					initials={updatedBy.initials}
					fullName={updatedBy.fullName}
				/>
			</CardFooter>
		</Card>
	);
}

export function TicketCardComponent({
	title,
	description,
	createdAt,
	updatedAt,
	updatedBy,
	assignedTo,
}: Ticket) {
	return (
		<TicketCard
			title={title}
			description={description}
			createdAt={createdAt}
			updatedAt={updatedAt}
			updatedBy={updatedBy}
			assignedTo={assignedTo}
		/>
	);
}
