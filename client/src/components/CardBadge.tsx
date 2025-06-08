import { Badge } from "@/components/ui/badge";

type CardBadgeProps = {
	content: string;
};
const statusBadgeStyles = {
	Open: "bg-blue-500 text-white dark:text-white",
	InProgress: "bg-amber-400 text-white dark:text-gray-900",
	InReview: "bg-purple-500 text-white dark:text-white",
	Testing: "bg-indigo-400 text-white dark:text-white",
	Done: "bg-green-600 text-white dark:text-white",
	Closed: "bg-gray-700 text-white dark:text-white",
	Blocked: "bg-red-600 text-white dark:text-white",
	Cancelled: "bg-zinc-400 text-white dark:text-gray-900",
};

export const CardBadge = ({ content }: CardBadgeProps) => {
	return (
		<Badge
			variant="default"
			className={
				statusBadgeStyles[content as keyof typeof statusBadgeStyles]
			}
		>
			{content}
		</Badge>
	);
};
