import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { _Date } from "@/components/Ticket/TicketDateBadge";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Link } from "@tanstack/react-router";
import { ProfileHoverCard } from "../Profile/ProfileHoverCard";
import { Profile } from "../Profile/types/Profile";
import { Project } from "../Project/types/Project";

export type TicketCardProps = {
	id: string;
	title: string;
	status: string;
	updatedAt: Date;
	updatedBy: Profile;
	project: Project;
};

export function TicketCard({
	id,
	title,
	status,
	updatedAt,
	updatedBy,
	project,
}: TicketCardProps) {
	const statusBadgeStyles = {
		"not-started": "bg-red-700 text-white dark:text-white",
		"in-progress": "bg-amber-300 text-gray-900 dark:text-gray-900",
		completed: "bg-green-900 text-white dark:text-white",
	};

	return (
		<Card className="hover:bg-card-foreground/25 dark:hover:bg-card/55 relative flex h-[250px] w-2xs flex-col transition-all">
			<Link
				to="/tickets/$ticketId"
				className="absolute inset-0 z-5"
				params={{ ticketId: id }}
			>
				<span className="sr-only">Ticket Details for {title}</span>
			</Link>
			<div>
				<CardHeader className="px-4 pt-4 pb-2">
					<CardTitle className="pb-4">{title}</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col gap-2 px-4">
					<Badge variant="default">
						{project?.name || "No Project"}
					</Badge>
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
				<CardFooter className="flex flex-col items-start gap-4 px-4 pt-2 pb-4">
					<_Date labelContent="Updated At" date={updatedAt} />
					{updatedBy && (
						<HoverCard>
							<HoverCardTrigger className="z-7">
								<Avatar>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</HoverCardTrigger>
							<HoverCardContent className="z-10 max-w-80">
								<div className="bg-card dark:bg-card rounded-lg border border-gray-300 px-3 py-2 transition-all dark:border-gray-600">
									<ProfileHoverCard
										id={
											"dd51cc4a-1240-524d-bee1-6b9a11d20ab7"
										}
									/>
								</div>
							</HoverCardContent>
						</HoverCard>
					)}
				</CardFooter>
			</div>
		</Card>
	);
}
