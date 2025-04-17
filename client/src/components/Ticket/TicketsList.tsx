import { badgeVariants } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

function TicketCard() {
	return (
		// TODO: to set smaller width
		<Card className="min-w-sm w-fit"> 
			<CardHeader>
				{/* TODO: do not use link */}
				<Link
					className={badgeVariants({ variant: "outline" })}
					to={"."}
				>
					Assigned To
				</Link>
				<CardTitle>Ticket Title</CardTitle>
				<CardDescription>Ticket Description</CardDescription>
			</CardHeader>
			<CardFooter className="flex flex-col gap-4 items-start">
				<div>
					<label>Created At</label>
					{/* TODO: do not use link, use badge */}
					<Link
						className={badgeVariants({ variant: "outline" })}
						to={"."}
					>
						4/17/2025
					</Link>
				</div>
				<div>
					<label>Upadated At</label>
					{/* TODO: do not use link, use badge */}
					<Link
						className={badgeVariants({ variant: "outline" })}
						to={"."}
					>
						4/17/2025
					</Link>
				</div>
				<div>
					<label>Updated By</label>
					{/* TODO: do not use link, use avatar */}
					<Link
						className={badgeVariants({ variant: "destructive" })}
						to={"."}
					>
						Petya Licheva
					</Link>
				</div>
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
