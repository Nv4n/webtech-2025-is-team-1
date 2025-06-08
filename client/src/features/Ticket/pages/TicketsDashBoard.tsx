import { TicketsFilter } from "@/features/Ticket/components/TicketFilter";
import { TicketsGroup } from "@/features/Ticket/components/TicketsGroup";
import { TicketStatuses } from "@/features/Ticket/types/Ticket";

export function TicketsDashboard() {
	return (
		<div>
			<TicketsFilter />
			<div className="grid w-full columns-3 space-x-4 p-4">
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
