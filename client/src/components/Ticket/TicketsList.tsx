import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";

const CardTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("leading-none font-semibold tracking-tight", className)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-muted-foreground text-sm", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

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
