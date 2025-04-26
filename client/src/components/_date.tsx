import { Badge } from "@/components/ui/badge";
import {TicketDate} from "@/components/Ticket/types/TicketDate"


export function _Date({ labelContent, date }: TicketDate) {
	return (
		<div className="flex items-center space-x-2">
			<label>{labelContent}</label>
			<Badge variant="outline">
				<pre>{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</pre>
			</Badge>
		</div>
	);
}