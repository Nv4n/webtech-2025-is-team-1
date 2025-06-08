import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TicketsFilter } from "@/features/Ticket/components/TicketFilter";
import { TicketsGroup } from "@/features/Ticket/components/TicketsGroup";
import { TicketStatuses } from "@/features/Ticket/types/Ticket";

export function TicketsDashboard() {
	return (
		<div>
			<div className="flex w-2xl px-8">
				<TicketsFilter />
			</div>
			<ScrollArea className="mx-auto my-0 max-w-7xl space-x-4 rounded-md border p-4 whitespace-nowrap">
				<ScrollBar
					className="fixed top-2 left-0"
					orientation="horizontal"
				/>
				<div className="flex gap-16">
					{TicketStatuses.map((status) => {
						// console.log(status);

						return (
							<TicketsGroup
								key={status}
								filter={{ statuses: [status] }}
							/>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
}

// export function TicketsDashboardWithFilter() {
// 	return (
// 		<div>
// 			<TicketsFilter />
// 			<div className="flex w-full justify-center space-x-4 p-4">
// 				{TicketStatuses.map((status) => {
// 					// console.log(status);

// 					return <TicketsGroup />;
// 				})}
// 			</div>
// 		</div>
// 	);
// }
