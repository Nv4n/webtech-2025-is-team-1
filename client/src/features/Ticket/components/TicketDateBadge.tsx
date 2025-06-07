import { LabelSpan } from "@/components/LabelSpan";
import { Badge } from "@/components/ui/badge";
import { TicketDate } from "@/features/Ticket/types/TicketDate";

export function _Date({ labelContent, date }: TicketDate) {
	return (
		<div className="flex items-center space-x-2">
			<LabelSpan content={labelContent} />
			<Badge variant="outline">
				<pre>{new Date(date).toLocaleString()}</pre>
			</Badge>
		</div>
	);
}
