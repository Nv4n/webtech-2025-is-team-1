import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProfileHoverCard } from "@/features/Profile/components/ProfileHoverCard";
import { FakeProfileApi } from "@/features/Profile/service/profileApi";
import { getInitials } from "@/features/Profile/utils/getInitials";
import { FakeProjectApi } from "@/features/Project/service/projectApi";
import { FakeTicketApi } from "@/features/Ticket/service/ticketApi";

import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";

const statusBadgeStyles = {
	"not-started": "bg-red-700 text-white dark:text-white",
	"in-progress": "bg-amber-300 text-gray-900 dark:text-gray-900",
	completed: "bg-green-900 text-white dark:text-white",
};

export const TicketDetails = (id: string) => {
	

	if (isLoading) {
		return (
			<>
				<div className="mx-auto my-0 w-fit flex-col space-y-3">
					<Skeleton className="h-[125px] w-[250px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</>
		);
	}
	if (!ticket) {
		return (
			<>
				<p className="text-muted-foreground text-center text-xl">
					No such ticket id!
				</p>
			</>
		);
	}

	return (
		<>
			<Card className="relative isolate mx-auto mt-4 mb-0 w-fit max-w-lg px-4">
				<CardHeader>
					<div className="absolute top-2 right-2 flex gap-4">
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to="/tickets/$ticketId/edit"
									params={{ ticketId: id }}
									className="hover:bg-card-foreground/15w-fit rounded p-2"
								>
									<Pencil>
										<span className="sr-only">
											Edit ticket
										</span>
									</Pencil>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Edit ticket</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="submit"
									className="w-fit cursor-pointer rounded"
								>
									<Trash2>
										<span className="sr-only">
											Delete ticket
										</span>
									</Trash2>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p> Delete ticket</p>
							</TooltipContent>
						</Tooltip>
					</div>
					<CardTitle>{ticket.title}</CardTitle>
					<CardDescription className="flex gap-2">
						<span>status</span>
						{ticket.status && (
							<Badge
								variant="default"
								className={
									statusBadgeStyles[
										ticket.status as keyof typeof statusBadgeStyles
									]
								}
							>
								{ticket.status}
							</Badge>
						)}
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="flex gap-2">
						<span className="text-muted-foreground text-sm">
							project
						</span>
						<ProjectBadge id={ticket.project} />
					</div>
					<p>{ticket.description}</p>
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-4">
					{ticket.assignee && (
						<UserHoverCard
							id={ticket.assignee}
							content={"is assigned to issue"}
						/>
					)}
					{ticket.assignee && (
						<UserHoverCard
							id={ticket.updatedBy}
							content={"last updated issue"}
							date={ticket.updatedAt}
						/>
					)}
					<span className="text-muted-foreground text-sm">
						Created at {ticket.createdAt.toLocaleDateString()}
					</span>
				</CardFooter>
			</Card>
		</>
	);
};

type UserHoverCard = { id: string; content: string; date?: Date };

function UserHoverCard({ id, content, date }: UserHoverCard) {
	const { data: assignee, isLoading } = useQuery({
		queryKey: ["users", id],
		queryFn: () => FakeProfileApi().getProfileList(),
		select: (data) => {
			return Object.entries(data).filter(([key, _]) => key === id)[0][1];
		},
	});
	if (isLoading) {
		return (
			<>
				<Skeleton className="h-[20px] w-[35px] rounded-xl" />
			</>
		);
	}

	return (
		assignee && (
			<div className="flex gap-2">
				<HoverCard>
					<HoverCardTrigger>
						<Avatar>
							<AvatarFallback>
								{getInitials(
									assignee.firstName,
									assignee.lastName
								)}
							</AvatarFallback>
						</Avatar>
					</HoverCardTrigger>
					<HoverCardContent className="w-80">
						<ProfileHoverCard id={id}></ProfileHoverCard>
					</HoverCardContent>
				</HoverCard>
				<div className="flex flex-col">
					<p className="leading-7">
						{assignee.firstName} {assignee.lastName} {content}{" "}
						{date &&
							`on
						${date.toLocaleDateString()}`}
					</p>
				</div>
			</div>
		)
	);
}

type ProjectBadgeProps = {
	id: string;
};

function ProjectBadge({ id }: ProjectBadgeProps) {
	const { data: project, isLoading } = useQuery({
		queryKey: ["projects", id],
		queryFn: () => FakeProjectApi().getProjectList(),
		select: (data) => {
			return Object.entries(data).filter(([key, _]) => key === id)[0][1];
		},
	});
	if (isLoading) {
		return (
			<>
				<Skeleton className="h-[125px] w-[250px] rounded-xl" />
			</>
		);
	}

	return <Badge variant="default">{project?.name || "No Project"}</Badge>;
}
