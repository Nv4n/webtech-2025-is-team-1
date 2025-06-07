import { CardBadge } from "@/components/CardBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ProfileHoverCard } from "@/features/Profile/components/ProfileHoverCard";
import { getInitials } from "@/features/Profile/utils/getInitials";
import { _Date } from "@/features/Ticket/components/TicketDateBadge";
import { Link } from "@tanstack/react-router";

export type TicketCardProps = {
	id: string;
	title: string;
	status: string;
	updatedAt: Date;
	updatedBy: {
		fname: string;
		lname: string;
		username: string;
		id?: string;
	};
	project: string;
};

export function TicketCard({
	id,
	title,
	status,
	updatedAt,
	updatedBy,
	project,
}: TicketCardProps) {
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
					<Badge variant="default">{project || "No Project"}</Badge>
					{status && <CardBadge content={status}></CardBadge>}
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-4 px-4 pt-2 pb-4">
					<_Date labelContent="Updated At" date={updatedAt} />
					{updatedBy && (
						<HoverCard>
							<HoverCardTrigger className="z-7">
								<Avatar>
									<AvatarFallback>
										{getInitials(
											updatedBy.fname,
											updatedBy.lname
										)}
									</AvatarFallback>
								</Avatar>
							</HoverCardTrigger>
							<HoverCardContent className="z-10 max-w-80">
								<div className="bg-card dark:bg-card rounded-lg border border-gray-300 px-3 py-2 transition-all dark:border-gray-600">
									{updatedBy && (
										<ProfileHoverCard
											id={updatedBy?.id ?? ""}
										/>
									)}
								</div>
							</HoverCardContent>
						</HoverCard>
					)}
				</CardFooter>
			</div>
		</Card>
	);
}
