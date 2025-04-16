import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BellRing, Check } from "lucide-react";
import { Ticket } from "@/components/Ticket/types/Ticket";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
			}, 10000);
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
				<Card className="mx-auto mt-4 mb-0 w-fit px-4">
					<CardHeader>
						<CardTitle>{ticket.title}</CardTitle>
						<CardDescription>
							status <Badge>{ticket.status}</Badge>
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="flex items-center space-x-4 rounded-md border p-4">
							<BellRing />
							<div className="flex-1 space-y-1">
								<p className="text-sm leading-none font-medium">
									Push Notifications
								</p>
								<p className="text-muted-foreground text-sm">
									Send notifications to device.
								</p>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full">
							<Check /> Mark all as read
						</Button>
					</CardFooter>
				</Card>
			</>
		)
	);
};
