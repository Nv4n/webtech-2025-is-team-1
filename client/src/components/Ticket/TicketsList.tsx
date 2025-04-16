import { badgeVariants } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

function TicketCard() {
	return (
		<Card>
			<CardHeader>
				<Link
					className={badgeVariants({ variant: "outline" })}
					to={"."}
				>
					Assigned To
				</Link>
				<CardDescription>Ticket Description</CardDescription>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<Link
					className={badgeVariants({ variant: "outline" })}
					to={"."}
				>
					Created At
				</Link>
				<Link
					className={badgeVariants({ variant: "outline" })}
					to={"."}
				>
					Updated At
				</Link>
				<Link
					className={badgeVariants({ variant: "destructive" })}
					to={"."}
				>
					Modified By
				</Link>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
}

export function TicketsList() {
	return (
		<div>
			<h1>Dashboard</h1>
			<TicketCard />
		</div>
	);
}

