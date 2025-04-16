import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BellRing, Check } from "lucide-react";

export const TicketDetails = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>You have 3 unread messages.</CardDescription>
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
	);
};
