import { LabelSpan } from "@/components/LabelSpan";
import { TicketDate } from "@/components/Ticket/types/TicketDate";
import { Badge } from "@/components/ui/badge";

export function _Date({ labelContent, date }: TicketDate) {
	return (
		<div className="flex items-center space-x-2">
			<LabelSpan content={labelContent} />
			<Badge variant="outline">
				<pre>
					{date.getMonth()}/{date.getDate()}/{date.getFullYear()}
				</pre>
			</Badge>
		</div>
	);
}
