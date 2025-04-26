import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardFooter,
} from "../ui/card";
import { _Date } from "../_date";
import { UserHoverCard } from "../Profile/user-hover-card";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "./types/Ticket";
import { Profile } from "@/components/Profile/types/Profile";

export type TicketCardProps = Ticket & {
	usersById: Record<string, Profile>;
};

export function TicketCard({
	title,
	description,
	createdAt,
	updatedAt,
	updatedBy,
	asignees,
	project,
	status,
	usersById,
}: TicketCardProps) {
	const assignedUser = usersById[asignees[0]];
	const updatedUser = usersById[updatedBy];

	const getInitials = (user: Profile | undefined) =>
		user ? `${user.fname[0]}${user.lname[0]}`.toUpperCase() : "";
	const getFullName = (user: Profile | undefined) =>
		user ? `${user.fname} ${user.lname}` : "";
	const getEmail = (user: Profile | undefined) =>
		user ? `${user.username}@yourdomain.com` : "";

	const statusBadgeStyles = {
		"not-started": "bg-red-700 text-white dark:text-white",
		"in-progress": "bg-amber-300 text-gray-900 dark:text-gray-900",
		completed: "bg-green-900 text-white dark:text-white",
	};
	return (
		<Card className="flex h-[400px] w-2xs flex-col">
			<CardHeader>
				<CardTitle className="pb-4">{title}</CardTitle>
				<div className="text-muted-foreground max-h-[200px] overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
					{description}
				</div>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col gap-2">
				<Badge variant="default">{project}</Badge>

				{assignedUser ? (
					<UserHoverCard
						labelContent="Assigned To"
						initials={getInitials(assignedUser)}
						fullName={getFullName(assignedUser)}
						email={getEmail(assignedUser)}
					/>
				) : (
					<div className="h-10" /> // Empty placeholder div same height as UserHoverCard
				)}

				{status && (
					<Badge
						variant="default"
						className={
							statusBadgeStyles[
								status as keyof typeof statusBadgeStyles
							]
						}
					>
						{status}
					</Badge>
				)}
			</CardContent>

			<CardFooter className="flex flex-col items-start gap-4">
				<_Date labelContent="Created At" date={createdAt} />
				<_Date labelContent="Updated At" date={updatedAt} />

				{updatedUser && (
					<UserHoverCard
						labelContent="Updated By"
						initials={getInitials(updatedUser)}
						fullName={getFullName(updatedUser)}
						email={getEmail(updatedUser)}
					/>
				)}
			</CardFooter>
		</Card>
	);
};