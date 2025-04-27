import { ProfileHoverCard } from "@/components/Profile/ProfileHoverCard";
import { FakeTicketApi } from "@/components/Ticket/service/ticketApi";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { useQuery } from "@tanstack/react-query";

export const TicketDetails = (id: string) => {
	const { data: ticket, isLoading } = useQuery({
		queryKey: ["tickets", id],
		queryFn: () => FakeTicketApi().getTicketDetails(),
		select: (data) => {
			return Object.entries(data).filter(([key, _]) => key === id)[0][1];
		},
	});
	

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
			<Card className="mx-auto mt-4 mb-0 w-fit max-w-lg px-4">
				<CardHeader>
					<CardTitle>{ticket.title}</CardTitle>
					<CardDescription>
						status <Badge>{ticket.status}</Badge>
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<p>{ticket.description}</p>
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-4">
					<div className="flex gap-2">
						<HoverCard>
							<HoverCardTrigger>
								<Avatar>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</HoverCardTrigger>
							<HoverCardContent className="w-80">
								<ProfileHoverCard
									id={ticket.asignedTo || ""}
								></ProfileHoverCard>
							</HoverCardContent>
						</HoverCard>
						<div className="flex flex-col">
							<p className="leading-7">
								Coco Nitro created issue
							</p>
							<span className="text-muted-foreground text-sm">
								{new Date().toLocaleDateString()}
							</span>
						</div>
					</div>
					<div className="flex gap-2">
						<HoverCard>
							<HoverCardTrigger>
								<Avatar>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</HoverCardTrigger>
							<HoverCardContent className="w-80">
								<ProfileHoverCard
									id={ticket.updatedBy || ""}
								></ProfileHoverCard>
							</HoverCardContent>
						</HoverCard>
						<div className="flex flex-col">
							<p className="leading-7">
								Coco Nitro modified issue
							</p>
							<span className="text-muted-foreground text-sm">
								{new Date().toLocaleDateString()}
							</span>
						</div>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};
