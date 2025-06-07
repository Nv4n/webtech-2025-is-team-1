import { Badge } from "@/components/ui/badge";

type CardBadgeProps = {
	content: string;
};

export const CardBadge = ({ content }: CardBadgeProps) => {
	const statusBadgeStyles = {
		"not-started": "bg-red-700 text-white dark:text-white",
		"in-progress": "bg-amber-300 text-gray-900 dark:text-gray-900",
		completed: "bg-green-900 text-white dark:text-white",
	};
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
