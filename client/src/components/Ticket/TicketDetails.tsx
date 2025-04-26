import { ProfileHoverCard } from "@/components/Profile/ProfileHoverCard";
import { Ticket } from "@/components/Ticket/types/Ticket";
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


const FakeTicketApi = () => {
	const getTicketDetails = () => {
		const ticket: Ticket = {
			title: "Issue 01",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, repellat. Tempore corporis hic nulla odit sit voluptates ut exercitationem excepturi eaque eligendi earum quidem iusto doloribus nostrum, voluptas, voluptatem error.",
			asignees: ["2691c583-74b5-5e2c-a359-b6715beec586"],
			createdAt: new Date(),
			updatedAt: new Date(),
			updatedBy: "2691c583-74b5-5e2c-a359-b6715beec586",
			status: "TO DO",
		};
		return new Promise<Ticket>((resolve) => {
			setTimeout(() => {
				resolve(ticket);
			}, 1000);
		});
	};
	return { getTicketDetails };
};

export const TicketDetails = (id: string) => {
	const { data: ticket, isLoading } = useQuery({
		queryKey: ["tickets", id],
		queryFn: () => FakeTicketApi().getTicketDetails(),
	});
	console.log(isLoading);
	console.log(ticket);

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

	return (
		!!ticket && (
			<>
				<Card className="mx-auto mt-4 mb-0 w-fit max-w-lg px-4">
					<CardHeader>
						<CardTitle>{ticket.title}</CardTitle>
						<CardDescription>
							status <Badge>{ticket.status}</Badge>
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Cupiditate dignissimos tempore hic ratione
							placeat quis, repudiandae doloribus, tenetur illo id
							rerum ut, inventore rem expedita. Saepe harum quasi
							dolorum fugit!
						</p>
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
										id={
											"dd51cc4a-1240-524d-bee1-6b9a11d20ab7"
										}
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
										id={
											"8dbc03bf-524d-5613-b980-cf53ed53f14b"
										}
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
		)
	);
};
